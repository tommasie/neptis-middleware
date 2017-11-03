import * as express from 'express';
import * as path from 'path';
import * as fs from 'fs';
import * as https from 'https';
import * as http from 'http';
import * as rp from 'request-promise';
import * as admin from "firebase-admin";
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

import {logger} from './config/logger';
import {apiRouter} from './routes/apiRoutes';
import {adminRouter} from './routes/adminRoutes';
import {androidRouter} from './routes/androidRoutes';
import {loginRouter} from './routes/loginRouter';

export class WebApi {
    /**
    * @param app - express application
    * @param port - port to listen on
    */
    constructor(private app: express.Express, private port: number) {
        this.configureApp(app);
        this.configureRoutes(app);
    }

    private configureApp(app: express.Express) {
        app.use(bodyParser.urlencoded({
            extended: false
        }));
        app.use(bodyParser.json());
        app.use(morgan("dev"));
        app.use(cors());
    }

    private configureRoutes(app: express.Express) {
        app.use("/auth", loginRouter);
        app.use("/api", apiRouter);
        app.use("/api/admin", adminRouter);
        app.use("/api/android", androidRouter);
        app.use('/', express.static('public'));
    }


    public run() {
        logger.debug("start");
        // https.createServer({
        //     key: fs.readFileSync('./certificates/private-key_neptis-poleis.pem'),
        //     cert: fs.readFileSync('./certificates/neptis-poleis_certificate.cer')
        // }, this.app).listen(this.port);
        http.createServer(this.app).listen(this.port);
    }
}
