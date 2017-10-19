import * as express                     from 'express';
import * as rp                          from 'request-promise';
import jwt = require('jsonwebtoken');
import {logger}                         from '../config/logger';
import {CityPlanning, MuseumPlanning}    from '../planning';

let serverName = "http://localhost:3200/";
let curator_id = 1;

const androidRouter = express.Router();

androidRouter.use((req,res,next) => {
    //TODO
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
        res.send(500);
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
    .catch((err) => {
        res.send(500);
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
    .catch((err) => {
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
    let result = cp.exec(res);
    console.log(result);
    res.status(200).send(result);
});

export {androidRouter};
