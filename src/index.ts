import express = require('express');
import { WebApi } from './application';
const config = require('../config/config.json');
let port = config.port; //or from a configuration file
let api = new WebApi(express(), port);
api.run();
console.info(`listening on ${port}`);
