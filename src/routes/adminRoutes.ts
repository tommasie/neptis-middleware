import * as config from 'config';
import * as express from 'express';
import * as fs from 'fs';
import * as im from 'imagemagick';
import * as multer from 'multer';
import * as rp from 'request-promise';
import { logger } from '../config/logger';
import { Topology } from '../museumTopology';
const dbServer = config.get('dbServer');
const adminRouter = express.Router();

/*const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '/root/thomas/node-middleware/img/');
      },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
      },
});*/
// const upload = multer({storage});

const upload = multer({ dest: '/root/thomas/node-middleware/img/' }); // Field name and max count

adminRouter.use((req, res, next) => {
    rp.get(dbServer + 'curator/id/' + req.email)
        .then((id) => {
            req.curator = id;
            next();
        }).catch((err) => {
            // Should only happen during registration
            logger.error(err);
            next();
        });
});

adminRouter.post('/register', (req, res) => {
    rp.post({
        body: req.body,
        json: true,
        uri: dbServer + 'curator/register',
    }).then((curator) => {
        res.status(201).json({
            id: curator.id,
        });
    }).catch((err) => {
        res.sendStatus(500);
    });
});

adminRouter.route('/attractionc')
    .get((req, res) => {
        rp.get({
            uri: dbServer + 'attractionc?curator_id=' + req.curator,
        })
            .then((body) => {
                res.status(200).send(body);
            })
            .catch((err) => {
                logger.error(err);
                res.status(500).json(null);
            });
    })
    .post(upload.single('picture'), (req, res) => {
        logger.debug(req.file);
        logger.debug(req.body);
        const attraction = req.body;
        attraction.curator_id = req.curator;
        attraction.picture = req.file.filename;
        im.resize({
            dstPath: `/root/thomas/node-middleware/img/${req.file.filename}_thumb`,
            height: 64,
            srcPath: `/root/thomas/node-middleware/img/${req.file.filename}`,
            width: 64,
        }, (err, stdout, stderr) => {
            if (err) throw err;
            logger.debug('saved converted file');
        });
        logger.debug(attraction);
        rp.post({
            json: attraction,
            uri: dbServer + 'attractionc',
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
    .get((req, res) => {
        const id = req.params.attraction_id;
        rp.get({
            uri: dbServer + 'attractionc/' + id,
        }).then((attraction) => {
            attraction = JSON.parse(attraction);
            attraction.picture = 'http://localhost:9070/api/img/' + attraction.picture;
            attraction = JSON.stringify(attraction);
            res.send(attraction);
        }).catch((err) => {
            logger.error(err);
            res.sendStatus(500);
        });
    })

    .put((req, res) => {
        const id = req.params.attraction_id;
        const attraction = req.body;
        attraction.curator_id = req.curator;
        logger.debug(attraction);
        rp.put({
            body: attraction,
            json: true,
            url: dbServer + 'attractionc/' + id,
        }).then((response) => {
            res.status(200).json();
            return;
        }).catch((error) => {
            res.sendStatus(500);
            return;
        });
    })
    .delete((req, res) => {
        const id = req.params.attraction_id;
        rp.delete({
            uri: dbServer + 'attractionc/' + id,
        }).then((response) => {
            return res.status(200).json(response);
        }).catch((error) => {
            return res.status(500).json(error);
        });
    });

adminRouter.route('/museums')
    .get((req, res) => {
        rp.get({
            uri: dbServer + 'museums?curator_id=' + req.curator,
        })
            .then((body) => {
                res.status(200).send(body);
            })
            .catch((err) => {
                res.sendStatus(500);
            });
    });

adminRouter.route('/museums/:id')
    .get((req, res) => {
        const id = req.params.id;
        rp.get({ uri: dbServer + 'museums/' + id })
            .then((museum) => {
                logger.debug(museum);
                res.status(200).send(museum);
            })
            .catch((err) => {
                res.sendStatus(500);
            });
    })
    .put((req, res) => {
        const id = req.params.id;
        const museum = req.body;
        museum.curator_id = req.curator;
        rp.put({
            json: museum,
            uri: dbServer + 'museums/' + id,
        })
            .then((response) => {
                res.status(200).end();
            })
            .catch((err) => {
                res.sendStatus(500);
            });
    })
    .delete((req, res) => {
        const id = req.params.id;
        rp.delete({ uri: dbServer + 'museums/' + id })
            .then((museum) => {
                res.status(200).end();
            })
            .catch((err) => {
                res.status(500).end();
            });
    });

adminRouter.route('/museum')
    .post((req, res) => {
        const museum = req.body;
        museum.curator_id = req.curator;
        rp.post({
            json: museum,
            uri: dbServer + 'museums/',
        })
            .then((response) => {
                res.status(201).send(response);
            })
            .catch((err) => {
                res.status(500).end();
            });
    });

adminRouter.route('/rooms')
    .post((req, res) => {
        const room = req.body;
        rp.post({
            json: room,
            uri: dbServer + 'room/' + room.museum_id,
        })
            .then((response) => {
                res.status(201).send(response);
            })
            .catch((err) => {
                res.status(500).end();
            });
    });

adminRouter.route('/rooms/:id')
    .put((req, res) => {
        rp.put({
            json: req.body,
            uri: dbServer + 'room/' + req.body.id,
        })
            .then((response) => {
                res.status(200).send(response);
            })
            .catch((err) => {
                logger.debug(err);
                res.status(500).end();
            });
    })
    .delete((req, res) => {
        rp.delete(dbServer + 'room/' + req.body.id)
            .then((response) => {
                res.status(200).end();
            })
            .catch((err) => {
                logger.debug(err);
                res.status(500).end();
            });
    });

adminRouter.post('/room/adjacency', (req, res) => {
    rp.post({
        json: req.body,
        uri: dbServer + 'room/adjacency',
    })
        .then((response) => {
            res.status(201).end();
        })
        .catch((err) => {
            res.status(500).end();
        });
});

adminRouter.delete('/room/adjacency/:from/:to', (req, res) => {
    rp.delete({
        json: req.body,
        uri: dbServer + `room/adjacency/${req.params.from}/${req.params.to}`,
    })
        .then((response) => {
            res.status(201).end();
        })
        .catch((err) => {
            res.status(500).end();
        });
});

adminRouter.route('/attractionm')
    .post(upload.single('picture'), (req, res) => {
        logger.debug(req.file);
        logger.debug(req.body);
        const attractionM = req.body;
        attractionM.picture = req.file.filename;
        im.resize({
            dstPath: `/root/thomas/node-middleware/img/${req.file.filename}_thumb`,
            height: 64,
            srcPath: `/root/thomas/node-middleware/img/${req.file.filename}`,
            width: 64,
        }, (err, stdout, stderr) => {
            if (err) throw err;
            logger.debug('saved converted file');
        });
        logger.debug(attractionM);
        rp.post({
            json: attractionM,
            uri: dbServer + 'attractionm/',
        })
            .then((response) => {
                res.status(201).send(response);
            })
            .catch((err) => {
                logger.errror(err);
                res.status(500).end();
            });
    });

adminRouter.route('/attractionm/:id')
    .put((req, res) => {
        // TODO do something
    })
    .delete((req, res) => {
        logger.debug(req.params.id);
        rp.delete(dbServer + 'attractionm/' + req.params.id)
            .then((img) => {
                logger.debug(img);
                img = JSON.parse(img);
                const picture = img.picture;
                if (picture != null) {
                    fs.unlink('./img/' + picture, (err) => {
                        if (err)  return res.status(500).end();
                        fs.unlink('./img/' + picture + '_thumb', (err2) => {
                            if (err2) res.status(500).end();
                            else res.status(200).end();
                        });
                    });
                }
            })
            .catch((err) => {
                res.status(500).end();
            });
    });

export { adminRouter };
