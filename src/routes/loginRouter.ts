import * as express   from 'express';
import * as rp        from 'request-promise';
import {Token} from '../tokenGenerator';
const comuni = require('../assets/comuni.json');
const config = require('../../config/config.json');
const serverName = config.DBUrl;

const loginRouter = express.Router();

loginRouter.post('/admin', (req,res) => {

    let email = req.body.email;
    let password = req.body.password;

    rp({
        uri: serverName + "curator/auth",
        method: "POST",
        body: req.body,
        json: true,
        //resolveWithFullResponse: true
    })
    .then((response) => {
        let token = Token.generateToken(response.id, email);
        res.status(200).json({
            id: response.id,
            email: email,
            token: token
        });
    })
    .catch((err) => {
        res.sendStatus(404);
    });
});

loginRouter.post('/register/admin', (req,res) => {
    let city = req.body.city;
    let region = req.body.region;
    let email = req.body.email;
    let password = req.body.password;

    rp.post({
        uri: serverName + "curator/register",
        body: req.body,
        json: true
    }).then(curator => {
        let token = Token.generateToken(curator.id,email);
        res.status(201).json({
            id: curator.id,
            email: email,
            token: token
        });
    }).catch(err => {
        res.sendStatus(500);
    });
});

loginRouter.get('/comuni', (req,res) => {
    res.send(comuni);
});

loginRouter.get('/organizzazioni', (req,res) => {
    rp.get({
        uri: serverName + "organizations",
        json: true
    }).then(organizations => {
        res.status(200).send(organizations);
    }).catch(err => {
        res.sendStatus(500);
    })

});

export {loginRouter};
