import * as express                     from 'express';
import * as rp                          from 'request-promise';
import {logger}                         from '../config/logger';
import {CityPlanning, MuseumPlanning}    from '../planning';
const config = require('../../config/config.json');
const serverName = config.DBUrl;

const androidRouter = express.Router();

androidRouter.use((req,res,next) => {
    //do something
    next();
});

androidRouter.route('/attractionc')
.get((req,res) => {
    let city = req.query.city;
    let region = req.query.region;
    rp.get({
        uri: serverName + "attractionc/city/?city=" + city + "&region=" + region,
    })
    .then(attractions => {
        res.status(200).send(attractions);
    })
    .catch(err => {
        logger.info(err);
        res.sendStatus(500);
    })
});

androidRouter.route('/attractionm/city')
.get((req,res) => {
    let city = req.query.city;
    let region = req.query.region;
    rp.get({
        uri: serverName + "attractionm/city/?city=" + city + "&region=" + region,
    })
    .then(attractions => {
        res.status(200).send(attractions);
    })
    .catch(err => {
        logger.info(err);
        res.sendStatus(500);
    })
});

androidRouter.route('/museums')
.get((req,res) => {
    let city = req.query.city;
    let region = req.query.region;
    rp.get({
        uri: serverName + "museums/city/?city=" + city + "&region=" + region,
    })
    .then(museums => {
        res.status(200).send(museums);
    })
    .catch(err => {
        logger.debug(err);
        res.sendStatus(500);
    })
});

androidRouter.route('/museums/attractions/:id')
.get((req,res) => {
    let id = req.params.id;
    rp.get({
        uri: serverName + "museums/attractions/" + id
    })
    .then(attractions => {
        res.status(200).send(attractions);
    })
    .catch(err => {
        res.send(500);
    })
});

androidRouter.route('/compute-plan-city')
.post((req,res) => {
    let cp = new CityPlanning(
        req.body.city,
        req.body.region,
        req.body.visits,
        req.body.must,
        req.body.exclude,
        req.body.lat,
        req.body.lng
    );
    cp.exec(res);
});

androidRouter.route('/compute-plan-museum')
.post((req,res) => {
    let cp = new MuseumPlanning(
        req.body.museum,
        req.body.id,
        req.body.visits,
        req.body.must,
        req.body.exclude,
    );
    cp.exec(res);
});

androidRouter.post('/report_queue', (req,res) => {
    rp.post({
        uri: serverName + "sensing/queue",
        body: req.body,
        json: true
    }).then(response => {
        res.sendStatus(201)
    }).catch(err => {
        logger.debug(err);
        res.sendStatus(500);
    });
});

androidRouter.post('/report_visit', (req,res) => {
    rp.post({
        uri: serverName + "sensing/visit",
        body: req.body,
        json: true
    }).then(response => {
        res.sendStatus(201)
    }).catch(err => {
        res.sendStatus(500);
    });
});

androidRouter.post('/report_rating', (req,res) => {
    rp.post({
        uri: serverName + "sensing/rating",
        body: req.body,
        json: true
    }).then(response => {
        res.sendStatus(201)
    }).catch(err => {
        res.sendStatus(500);
    });
});

export {androidRouter};
