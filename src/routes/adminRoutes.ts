import * as express from 'express';
import * as rp      from 'request-promise';
import jwt = require('jsonwebtoken');
import {logger} from '../config/logger';
import {Topology} from '../museumTopology';
let serverName = "http://localhost:3200/";
let curator_id = 1;
const adminRouter = express.Router();

/*adminRouter.use((req,res,next) => {
let token = req.get('Authorization');
if(token == null || token == "")
return res.sendStatus(403);
token = token.split(" ")[1];
jwt.verify(token, 'secret', (err, decoded) => {
if(err) {
console.log(err);
return res.sendStatus(403);
}

})
})*/

adminRouter.route('/attractionc')
.get((req,res) => {
    rp.get({
        uri: serverName + "attractionc?curator_id=" + curator_id,
    })
    .then((body) => {
        res.status(200).send(body);
    })
    .catch((err) => {
        res.sendStatus(500);
    });
})
.post((req, res) => {
    logger.debug(req.body);
    let attraction = req.body;
    attraction.curator_id = curator_id;
    rp.post({
        uri: serverName + "attractionc",
        json: attraction
    })
    .then((response) => {
        logger.debug(response);
        res.sendStatus(201);
    })
    .catch((err) => {
        logger.error(err);
        res.sendStatus(500);
    });
});

adminRouter.route('/attractionc/:attraction_id')
.get((req,res) => {
    let id = req.params.attraction_id;
    rp.get({
        uri: serverName + "attractionc/" + id,
    }).then(attraction => {
        res.send(attraction);
    }).catch(err => {
        res.sendStatus(500);
    });
})
.put((req,res) => {
    let id = req.params.attraction_id;
    let attraction = req.body;
    attraction.curator_id = curator_id;
    logger.debug(attraction);
    rp.put({
        url: serverName + "attractionc/" + id,
        body: attraction,
        json: true
    }).then(function(response) {
        res.sendStatus(200);
        return;
    }).catch(function(error){
        res.sendStatus(500);
        return;
    });
})
.delete((req,res) => {
    let id = req.params.attraction_id;
    rp.delete({
        uri: serverName + "attractionc/" + id,
    }).then(function(response) {
        res.sendStatus(200);
        return;
    }).catch(function(error){
        res.sendStatus(500);
        return;
    });
});

adminRouter.route('/museums')
.get((req,res) => {
    rp.get({
        uri: serverName + "museums",
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
    museum.curator_id = curator_id;
    logger.debug(museum);
    rp.post({
        uri: serverName + "museums",
        json: museum,
    })
    .then(museum => {
        //
        let tp = new Topology(req.body.links, req.body.start, req.body.end);
        rp.post({
            uri: serverName + "room/adjacency/" + museum.id,
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
        rp.get({uri: serverName + 'museums/' + id})
            .then(museum => {
                logger.debug(museum);
                res.status(200).send(museum);
            })
            .catch(err => {
                res.sendStatus(500);
            });
    })
    .put((req,res) => {
        let id = req.params.id;
        let museum = req.body;
        museum.curator_id = curator_id;
        rp.put({
            uri: serverName + 'museums/' + id,
            json: museum
        })
            .then(response => {
                res.sendStatus(200);
            })
            .catch(err => {
                res.sendStatus(500);
            });
    })
    .delete((req,res) => {
        let id = req.params.id;
        rp.delete({uri: serverName + 'museums/' + id})
            .then(museum => {
                res.status(200);
            })
            .catch(err => {
                res.sendStatus(500);
            });
    });

export {adminRouter};
