import * as express from 'express';
import * as rp from 'request-promise';
// tslint:disable-next-line:no-var-requires
const comuni = require('../assets/comuni.json');
import * as config from 'config';
const dbServer = config.get('dbServer');

const loginRouter = express.Router();

loginRouter.get('/comuni', (req, res) => {
    res.send(comuni);
});

loginRouter.get('/organizzazioni', (req, res) => {
    rp.get({
        json: true,
        uri: dbServer + 'organizations',
    }).then((organizations) => {
        res.status(200).send(organizations);
    }).catch((err) => {
        res.sendStatus(500);
    });

});

export {loginRouter};
