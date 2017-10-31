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
        app.use("/admin", adminRouter);
        app.use("/android", androidRouter);
        // mount more routers here
        // e.g. app.use("/organisation", organisationRouter);
        app.use('/', express.static('public'));
    }


    public run() {
        https.createServer({
            key: fs.readFileSync('./certificates/private-key_neptis-poleis.pem'),
            cert: fs.readFileSync('./certificates/neptis-poleis_certificate.cer')
        }, this.app).listen(this.port);
        //http.createServer(this.app).listen(this.port);
    }
}
