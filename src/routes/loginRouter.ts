import * as express   from 'express';
import * as rp        from 'request-promise';
const comuni = require('../assets/comuni.json');
import * as config from 'config';
const dbServer = config.get("dbServer");

const loginRouter = express.Router();

loginRouter.get('/comuni', (req,res) => {
    res.send(comuni);
});

loginRouter.get('/organizzazioni', (req,res) => {
    rp.get({
        uri: dbServer + "organizations",
        json: true
    }).then(organizations => {
        res.status(200).send(organizations);
    }).catch(err => {
        res.sendStatus(500);
    })

});

export {loginRouter};
