import * as bodyParser from 'body-parser';
import * as config from 'config';
import * as cors from 'cors';
import * as express from 'express';
import * as admin from 'firebase-admin';
import * as fs from 'fs';
import * as http from 'http';
import * as https from 'https';
import * as morgan from 'morgan';
import * as path from 'path';
import * as rp from 'request-promise';
import {logger} from './config/logger';
import {adminRouter} from './routes/adminRoutes';
import {androidRouter} from './routes/androidRoutes';
import {apiRouter} from './routes/apiRoutes';
import {loginRouter} from './routes/loginRouter';

export class WebApi {
    /**
     *  @param app  - express application
     *  @param port - port to listen on
     */
    constructor(private app: express.Express, private port: number) {
        this.configureApp(app);
        this.configureRoutes(app);
    }

    private configureApp(app: express.Express) {
        app.use(bodyParser.urlencoded({
            extended: false,
        }));
        app.use(bodyParser.json());
        app.use(morgan('dev'));
        app.use(cors());
    }

    private configureRoutes(app: express.Express) {
        app.use('/auth', loginRouter);
        app.use('/api', apiRouter);
        app.use('/api/admin', adminRouter);
        app.use('/api/android', androidRouter);
        app.use('/public/img', express.static('img'));
        app.use('/', express.static('public'));
    }

    // tslint:disable-next-line:member-ordering
    public run() {
        // Production server
        if (process.env.NODE_ENV === 'production') {
            https.createServer({
                cert: fs.readFileSync(config.get('httpsCert')),
                key: fs.readFileSync(config.get('httpsKey')),
            }, this.app).listen(this.port);
        } else {
            // Dev server
            http.createServer(this.app).listen(this.port);
        }
    }
}
