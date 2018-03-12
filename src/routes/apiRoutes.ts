// tslint:disable:no-var-requires
import * as express from 'express';
import * as rp from 'request-promise';
import {logger} from '../config/logger';
const admin = require('firebase-admin');
const serviceAccount = require('../../config/android-app-152db-firebase-adminsdk-7qtw8-d7b2d3b4b7.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://android-app-152db.firebaseio.com',
});

const apiRouter = express.Router();

apiRouter.use((req, res, next) => {
    if (process.env.NODE_ENV === 'production') {
        const token = req.get('Authorization');
        if (token == null || token === '') {
            return res.sendStatus(403);
        }
        admin.auth().verifyIdToken(token)
        .then((decodedToken) => {
            const email = decodedToken.firebase.identities.email[0];
            req.email = email;
            next();
        }).catch((error) => {
            logger.error(error);
        });
    } else {
        req.email = 'collerton.1674085@studenti.uniroma1.it';
        return next();
    }
});

export {apiRouter};
