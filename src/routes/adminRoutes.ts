import * as express from 'express';
import * as rp      from 'request-promise';
import * as multer from 'multer'
import * as fs from 'fs';
import {logger} from '../config/logger';
import {Topology} from '../museumTopology';
import * as config from 'config';
const dbServer = config.get("dbServer");
const adminRouter = express.Router();

const upload = multer({dest: "img/"}); //Field name and max count

adminRouter.use((req,res,next) => {
    rp.get(dbServer + "curator/id/" + req.email)
    .then(id => {
        req.curator = id;
        logger.debug(__dirname);
        next();
    }).catch(err => {
        //Should only happen during registration
        logger.error(err);
        next();
    });
});

adminRouter.post('/register', (req,res) => {
    rp.post({
        uri: dbServer + "curator/register",
        body: req.body,
        json: true
    }).then(curator => {
        res.status(201).json({
            id: curator.id,
        });
    }).catch(err => {
        res.sendStatus(500);
    });
});

adminRouter.route('/attractionc')
.get((req,res) => {
    rp.get({
        uri: dbServer + "attractionc?curator_id=" + req.curator,
    })
    .then((body) => {
        res.status(200).send(body);
    })
    .catch((err) => {
        console.log(err);
        res.status(500).json(null);
    });
})
.post(upload.single("picture"), (req, res) => {
    logger.debug(req.file);
    logger.debug(req.body);
    let attraction = req.body;
    attraction.curator_id = req.curator;
    attraction.picture = req.file.filename;
    logger.debug(attraction);
    rp.post({
        uri: dbServer + "attractionc",
        json: attraction
    })
    .then((response) => {
        logger.debug(response);
        res.status(201).json(response);
    })
    .catch((err) => {
        logger.error(err);
        res.status(500).json();
    });
});

adminRouter.route('/attractionc/:attraction_id')
.get((req,res) => {
    let id = req.params.attraction_id;
    rp.get({
        uri: dbServer + "attractionc/" + id,
    }).then(attraction => {
        attraction = JSON.parse(attraction);
        attraction.picture = "http://localhost:9070/api/img/" + attraction.picture;
        attraction = JSON.stringify(attraction);
        res.send(attraction);
    }).catch(err => {
        logger.error(err);
        res.sendStatus(500);
    });
})

.put((req,res) => {
    let id = req.params.attraction_id;
    let attraction = req.body;
    attraction.curator_id = req.curator;
    logger.debug(attraction);
    rp.put({
        url: dbServer + "attractionc/" + id,
        body: attraction,
        json: true
    }).then(function(response) {
        res.status(200).json();
        return;
    }).catch(function(error){
        res.sendStatus(500);
        return;
    });
})
.delete((req,res) => {
    let id = req.params.attraction_id;
    rp.delete({
        uri: dbServer + "attractionc/" + id,
    }).then(function(response) {
        return res.status(200).json(response);
    }).catch(function(error){
        return res.status(500).json(error);
    });
});

adminRouter.route('/museums')
.get((req,res) => {
    rp.get({
        uri: dbServer + "museums?curator_id=" + req.curator
    })
    .then((body) => {
        res.status(200).send(body);
    })
    .catch((err) => {
        res.sendStatus(500);
    })
})
.post((req,res) => {
    let museum = req.body;
    museum.curator_id = req.curator;
    logger.debug(museum);
    rp.post({
        uri: dbServer + "museums",
        json: museum,
    })
    .then(museum => {
        //
        let tp = new Topology(req.body.links, req.body.start);
        rp.post({
            uri: dbServer + "room/adjacency/" + museum.id,
            json: tp.preprocess2()
        }).then(() => {
            res.sendStatus(200);
        })
    })
    .catch(err => {
        res.sendStatus(500);
    })
});

adminRouter.route('/museums/:id')
.get((req,res) => {
    let id = req.params.id;
    rp.get({uri: dbServer + 'museums/' + id})
    .then(museum => {
        museum = JSON.parse(museum);
        rp.get(dbServer + "room/adjacencies/" + id)
        .then(neo4j => {
            neo4j = JSON.parse(neo4j);
            logger.debug(neo4j);
            let rooms = museum.rooms.map(r => {r.adjacent = []; return r});
            let roomIdMap = {};
            rooms.forEach(room => {
                roomIdMap[room['id']] = room;
            });
            Object.keys(neo4j.adjacencies).forEach(from => {
                neo4j.adjacencies[from].forEach(to => {
                    roomIdMap[from].adjacent.push(roomIdMap[to]);
                })
            })

            logger.debug(rooms);
            museum.rooms = rooms;
            logger.debug(museum);
            res.status(200).send(museum);
        })
    })
    .catch(err => {
        res.sendStatus(500);
    });
})
.put((req,res) => {
    let id = req.params.id;
    let museum = req.body;
    museum.curator_id = req.curator;
    rp.put({
        uri: dbServer + 'museums/' + id,
        json: museum
    })
    .then(response => {
        res.status(200).end();
    })
    .catch(err => {
        res.sendStatus(500);
    });
})
.delete((req,res) => {
    let id = req.params.id;
    rp.delete({uri: dbServer + 'museums/' + id})
    .then(museum => {
        res.status(200);
    })
    .catch(err => {
        res.sendStatus(500);
    });
});

adminRouter.route('/museum')
.post((req,res) => {
    let museum = req.body;
    museum.curator_id = req.curator;
    rp.post({
        uri: dbServer + 'museums/',
        json: museum
    })
    .then(response => {
        res.status(201).send(response);
    })
    .catch(err => {
        res.status(500).end();
    });
});

adminRouter.route('/rooms')
.post((req,res) => {
    let room = req.body;
    rp.post({
        uri: dbServer + 'room/' + room.museum_id,
        json: room
    })
    .then(response => {
        res.status(201).send(response);
    })
    .catch(err => {
        res.status(500).end();
    });
});

adminRouter.route('/rooms/:id')
.put((req,res) => {
    rp.put({
        uri: dbServer + 'room/' + req.body.id,
        json: req.body
    })
    .then(response => {
        res.status(200).send(response);
    })
    .catch(err => {
        logger.debug(err);
        res.status(500).end();
    })
})
.delete((req,res) => {
    rp.delete(dbServer + 'room/' + req.body.id)
    .then(response => {
        res.status(200).end();
    })
    .catch(err => {
        logger.debug(err);
        res.status(500).end();
    })
});

adminRouter.post('/room/adjacency', (req,res) => {
    rp.post({
        uri: dbServer + 'room/adjacency',
        json: req.body
    })
    .then(response => {
        res.status(201).end();
    })
    .catch(err => {
        res.status(500).end();
    });
})


adminRouter.route('/attractionm')
.post(upload.single("picture"), (req, res) => {
    logger.debug(req.file);
    logger.debug(req.body);
    let attraction_m = req.body;
    attraction_m.picture = req.file.filename;
    logger.debug(attraction_m);
    rp.post({
        uri: dbServer + 'attractionm/',
        json: attraction_m
    })
    .then(response => {
        res.status(201).send(response);
    })
    .catch(err => {
        console.log(err);
        res.status(500).end();
    });
});

adminRouter.route('/attractionm/:id')
.put((req,res) => {

})
.delete((req,res) => {
    logger.debug(req.params.id);
    rp.delete(dbServer + 'attractionm/' + req.params.id)
    .then(img => {
        logger.debug(img);
        let picture = img.picture;
        if(picture != null) {
            fs.unlink("./img/" + picture, (err) => {
                if(err) {
                    res.status(500).end();
                }
                else res.status(200).end();
            })
        }

    })
    .catch(err => {
        res.status(500).end();
    })
})

export {adminRouter};
