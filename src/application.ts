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
const config = require('config');
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
        app.use("/public/img", express.static("img"));
        app.use("/", express.static("public"));
    }


    public run() {
        //Production server
        logger.debug("NODE_ENV: "+  process.env.NODE_ENV);
        if(process.env.NODE_ENV == "production") {
            https.createServer({
                key: fs.readFileSync(config.get("httpsKey")),
                cert: fs.readFileSync(config.get("httpsCert"))
            }, this.app).listen(this.port);
        }
        else {
            //Dev server
            http.createServer(this.app).listen(this.port);
        }
    }
}
