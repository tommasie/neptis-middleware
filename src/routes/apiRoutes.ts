import * as express                     from 'express';
import * as rp                          from 'request-promise';
import {logger}                         from '../config/logger';
const config = require('../../config/config.json');
const serverName = config.DBUrl;
const admin = require("firebase-admin");
const serviceAccount = require("../../config/android-app-152db-firebase-adminsdk-7qtw8-d7b2d3b4b7.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://android-app-152db.firebaseio.com"
});

const apiRouter = express.Router();

apiRouter.use((req,res,next) => {
    let token = req.get('Authorization');
    if(token == null || token == "") {
        return res.sendStatus(403);
    }
    admin.auth().verifyIdToken(token)
    .then(decodedToken => {
        let email = decodedToken.firebase.identities.email[0];
        rp.get(serverName + "curator/id/" + email)
        .then(id => {
            req.curator = id;
            next();
        }).catch(err => {
            logger.error(err);
            return res.sendStatus(403);
        });
    }).catch(error => {
        logger.error(error);

    });
});

export {apiRouter};
