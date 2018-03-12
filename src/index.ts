import express = require('express');
import { WebApi } from './application';
import { logger } from './config/logger';
// tslint:disable-next-line:no-var-requires
const config = require('config');
const port = config.get('port'); // or from a configuration file
const api = new WebApi(express(), port);
api.run();
logger.info(`listening on ${port}`);
