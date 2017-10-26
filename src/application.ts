import * as express from 'express';
import * as path from 'path';
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

import {adminRouter} from './routes/adminRoutes';
import {androidRouter} from './routes/androidRoutes';
import {loginRouter} from './routes/loginRouter';
import {Topology} from './museumTopology';
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

      let mus = {
          'A': ['B','H'],
          'B': ['C'],
          'C': ['D','E'],
          'D': [],
          'E': ['F','G'],
          'F': [],
          'G': [],
          'H': ['I'],
          'I': ['J'],
          'J': []
      };
    }

    private configureRoutes(app: express.Express) {
        app.use("/auth", loginRouter );
        app.use("/admin", adminRouter );
        app.use("/android", androidRouter);
        // mount more routers here
        // e.g. app.use("/organisation", organisationRouter);
        app.use('/', express.static('../public'));
    }

    public run() {
        this.app.listen(this.port);
    }
}
