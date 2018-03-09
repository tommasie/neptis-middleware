import express = require('express');
import { WebApi } from './application';
const config = require('config');
let port = config.get("port"); //or from a configuration file
let api = new WebApi(express(), port);
api.run();
console.info(`listening on ${port}`);
