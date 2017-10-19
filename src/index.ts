import express = require('express');
import { WebApi } from './application';

let port = 9070; //or from a configuration file
let api = new WebApi(express(), port);
api.run();
console.info(`listening on ${port}`);
