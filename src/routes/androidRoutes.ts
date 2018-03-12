import * as config from 'config';
import * as express from 'express';
import * as rp from 'request-promise';
import {logger} from '../config/logger';
import {CityPlanning, MuseumPlanning} from '../planning';
const dbServer = config.get('dbServer');

const androidRouter = express.Router();

androidRouter.use((req, res, next) => {
    // do something
    next();
});

androidRouter.route('/attractionc')
.get((req, res) => {
    const city = req.query.city;
    const region = req.query.region;
    rp.get({
        uri: dbServer + 'attractionc/city/?city=' + city + '&region=' + region,
    })
    .then((attractions) => {
        res.status(200).send(attractions);
    })
    .catch((err) => {
        logger.info(err);
        res.sendStatus(500);
    });
});

androidRouter.route('/attractionm/city')
.get((req, res) => {
    const city = req.query.city;
    const region = req.query.region;
    rp.get({
        uri: dbServer + 'attractionm/city/?city=' + city + '&region=' + region,
    })
    .then((attractions) => {
        res.status(200).send(attractions);
    })
    .catch((err) => {
        logger.info(err);
        res.sendStatus(500);
    });
});

androidRouter.route('/museums')
.get((req, res) => {
    const city = req.query.city;
    const region = req.query.region;
    rp.get({
        uri: dbServer + 'museums/city/?city=' + city + '&region=' + region,
    })
    .then((museums) => {
        res.status(200).send(museums);
    })
    .catch((err) => {
        logger.debug(err);
        res.sendStatus(500);
    });
});

androidRouter.route('/museums/attractions/:id')
.get((req, res) => {
    const id = req.params.id;
    rp.get({
        uri: dbServer + 'museums/attractions/' + id,
    })
    .then((attractions) => {
        res.status(200).send(attractions);
    })
    .catch((err) => {
        res.send(500);
    });
});

androidRouter.route('/compute-plan-city')
.post((req, res) => {
    const cp = new CityPlanning(
        req.body.city,
        req.body.region,
        req.body.visits,
        req.body.must,
        req.body.exclude,
        req.body.lat,
        req.body.lng,
    );
    cp.exec(res);
});

androidRouter.route('/compute-plan-museum')
.post((req, res) => {
    const cp = new MuseumPlanning(
        req.body.museum,
        req.body.id,
        req.body.visits,
        req.body.must,
        req.body.exclude,
    );
    cp.exec(res);
});

androidRouter.post('/report_queue', (req, res) => {
    rp.post({
        body: req.body,
        json: true,
        uri: dbServer + 'sensing/queue',
    }).then((response) => {
        res.sendStatus(201);
    }).catch((err) => {
        logger.debug(err);
        res.sendStatus(500);
    });
});

androidRouter.post('/report_visit', (req, res) => {
    rp.post({
        body: req.body,
        json: true,
        uri: dbServer + 'sensing/visit',
    }).then((response) => {
        res.sendStatus(201);
    }).catch((err) => {
        res.sendStatus(500);
    });
});

androidRouter.post('/report_rating', (req, res) => {
    rp.post({
        body: req.body,
        json: true,
        uri: dbServer + 'sensing/rating',
    }).then((response) => {
        res.sendStatus(201);
    }).catch((err) => {
        res.sendStatus(500);
    });
});

export {androidRouter};
