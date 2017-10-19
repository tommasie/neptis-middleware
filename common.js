var express = require('express');
var request = require('request');
var rp = require('request-promise');
var async = require('async');
var url = require('url');
var app = require('./bootstrap');
var config = require('./src/config/config.json');
var logger = require('./logger');

//variable to hold the regular expression to match the ids of newlyPOSTed resources
var regex = /\d+$/g;

var serverUrl = config.serverUrl;
var appName = config.webapp;
var serverName = serverUrl  + appName;

var pathName;

var cityRouter = express.Router();
cityRouter.use(function(req,res,next) {
  pathName = '[' + req.baseUrl + '] ';
  logger.info(pathName + req.method + " " + req.ip);
  next();
});
cityRouter.route('/')
.get((req,res) => {
  rp.get({
    uri: serverName + "cities",
    //resolveWithFullResponse: true
  })
  .then((body) => {
    res.status(200).json(body);
  })
  .catch((err) => {
    console.log(err);
    res.sendStatus(500);
  });
  /*request({
  url: serverName + "cities",
  method: "GET",
  json: true,
  headers: [{
  'content-type': 'application/json'
}]
}, function(error, response, body) {
logger.info(pathName + "Request statusCode: " + response.statusCode);
if (!error & response.statusCode === 200) {
res.status(200).type('json').send(body);
return;
} else {
logger.warn(pathName + "/get_city fallita!: ");
return;
}
});*/
})
.post((req,res) => {
  var city = req.body.name;
  var region = req.body.region;
  var attractions = JSON.parse(req.body.attractions);

  var id_city;
  request({
    url: serverName + "city/",
    method: "POST",
    json: {
      name: city,
      region: region
    }
  }, function (error, response, body) {
    logger.debug(response.statusCode);
    if (!error && response.statusCode === 201) {
      logger.info(path, response.statusCode, "City " + city + " added");
      var loc = response.headers.location;
      var id = loc.match(regex);
      id_city = id[0];
      for(var i = 0; i < attractions.length; i++) {
        attractions[i].city = {id:id_city};
      }
      request({
        url: serverName + "attractionc/",
        method: "POST",
        json:attractions
      }, function (error, response, body) {
        if (!error & response.statusCode === 204) {
          logger.info(path, response.statusCode, "Attractions of city " + city + " added");
          res.sendStatus(201);
          return;
        } else {
          logger.error(path, response.statusCode, "The attractions of city " + city + " could not be added");
          res.sendStatus(500);
          return;
        }
      });
      return;
    } else if (response.statusCode === 400) { // city already present
      logger.error("!-- ERROR in adding city --! code: ", response.statusCode);
      res.send({
        error: 1
      });
      return;
    }
  });
});

cityRouter.route('/:city_id')
.get((req,res) => {
  cityId = req.params.city_id;
  logger.info(pathName + "id city: ", cityId);
  request({
    url: serverName + "attractionc/cityId=" + cityId,
    method: "GET",
    json: true,
    headers: [{
      'content-type': 'application/json'
    }]
  }, function(error, response, body) {
    logger.info(pathName + "Request statusCode: " + response.statusCode);
    if (!error & response.statusCode === 200) {
      logger.info(pathName + "***  get response : ", body);
      res.status(response.statusCode);
      //res.send({ response : 'ok'})
      res.send(body);
      return;
    } else {
      //res.status(response.statusCode);
      //res.send({error : 'reg_error'});
      //res.send(body);
      logger.info(pathName + "/get_attractionC failed!: ");
      return;
    }

  });
})
.put((req,res) => {

})
.delete((req,res) => {

});

cityRouter.route('/:region/:city')
.get((req,res) => {
  let region = req.params.region;
  let city = req.params.city;
  logger.info(pathName + "region name ", city, "city name ", region);
  rp({
    url: serverName + "city/" + city + ',' + region,
    method: "GET",
    json: true,
    headers: {
      'content-type': 'application/json'
    }
  })
  .then(function(body) {
    logger.info(body);
    let id = body[0].id;
    logger.info("city id: ", id);
    rp({
      url: serverName + "attractionc/cityId=" + id,
      method: "GET",
      json: true,
      headers: {
        'content-type': 'application/json'
      }
    })
    .then(function(body) {
      res.send(body);
    })
    .catch(function(err) {
      logger.error(err);
      res.sendStatus(404);
    });
  })
  .catch(function(err) {
    logger.error(err);
    res.sendStatus(404);
  });

});

app.use('/cities',cityRouter);

var attractioncRouter = express.Router();
attractioncRouter.use(function(req,res,next) {
  pathName = '[' + req.baseUrl + '] ';
  logger.info(pathName + req.method + " " + req.ip);
  next();
});

attractioncRouter.route('/')
.get((req,res) => {
  rp.get({
    uri: serverName + "attractionc",
    //resolveWithFullResponse: true
  })
  .then((body) => {
    logger.debug(body);
    res.status(200).send(body);
  })
  .catch((err) => {
    console.log(err);
    res.sendStatus(500);
  });
})
.post((req, res) => {
  logger.debug(req.body);
  let attraction = req.body;
  rp.post({
    uri: serverName + "attractionc",
    json: attraction
  })
    .then((response) => {
    logger.debug(response);
    })
    .catch((err) => {
      logger.error(err);
    });
});

attractioncRouter.route('/city')
.get((req,res) => {
  let city = req.query.city;
  let region = req.query.region;
  rp.get({
    uri: serverName + "attractionc/city/?city=" + city + "&region=" + region,
  })
    .then((body) => {
      res.status(200).send(body);
    })
    .catch((err) => {
      res.send(500);
    })
});

attractioncRouter.route('/:attraction_id')
.get((req,res) => {
  let id = req.params.attraction_id;
  let attraction = req.body.attraction;
  logger.debug(attraction);
  rp.get({
    uri: serverName + "attractionc/" + id,
  }).then(attraction => {
    res.send(attraction);
  }).catch(err => {
    res.sendStatus(500);
  });
})
.put((req,res) => {
  let id = req.params.attraction_id;
  let attraction = req.body.attraction;
  attraction.city = {id: req.body.cityId};
  logger.debug(attraction);
  rp({
    url: serverName + "attractionc/" + id,
    method: "PUT",
    body: attraction,
    json: true
  }).then(function(response) {
    res.sendStatus(200);
    return;
  }).catch(function(error){
    res.sendStatus(500);
    return;
  });
})
.delete((req,res) => {
  let id = req.params.attraction_id;
  rp({
    url: serverName + "attractionc/" + id,
    method: "DELETE",
    json: true
  }).then(function(response) {
    res.sendStatus(200);
    return;
  }).catch(function(error){
    res.sendStatus(500);
    return;
  });
});

app.use('/attractionc',attractioncRouter);

var museumRouter = express.Router();
museumRouter.use(function(req,res,next) {
  next();
});

museumRouter.route('/')
.get((req,res) => {
  rp.get({
    uri: serverName + "museums",
  })
    .then((body) => {
      res.status(200).send(body);
    })
    .catch((err) => {
      res.send(500);
    })
})
.post((req,res) => {
  var city = req.body.city;
  var region = req.body.region;
  var museumName = req.body.museumName;
  var attractions = JSON.parse(req.body.attractions);
  var startRoom = req.body.startRoom;
  var endRoom = req.body.endRoom;
  logger.debug("attractions:", JSON.stringify(attractions));
  var id_city;
  var id_museum;
  var id_area;

  _.forEach(attractions.adjacent, function(value) {
    value = value.toLowerCase.replace(/ /g, '_');
  });
  var adj = {};
  for(var i = 0; i < attractions.length; i++) {
    adj[attractions.name] = attractions.adjacent;
  }
  adj.start = startRoom;
  adj.end = endRoom;

  async.series([function(cb) {
    request({
      url: serverName + "city/",
      method: "POST",
      json: {
        name: city,
        region: region
      }
    }, function (error, response, body) {
      if (!error && response.statusCode === 201) {
        logger.info(path, response.statusCode, "City " + city + " added");
        var loc = response.headers.location;
        var id = loc.match(regex);
        id_city = id[0];
        logger.debug(path, "City id:", id_city);
        request({
          url: serverName + "museum/",
          method: "POST",
          json: {
            name: museumName,
            city: {
              id: id_city
            }
          }
        }, function (error, response, body) {
          if (!error && response.statusCode === 201) {
            logger.info(path, response.statusCode, "Museum " + museumName + " added");
            loc = response.headers.location;
            id = loc.match(regex);
            id_museum = id[0];
            logger.debug(path, "Museum id:", id_museum);

            //Manage the adjacencies on a local JSON file
            var adjPath = __dirname + "/adjacencies/" + city;
            if(!fs.existsSync(adjPath)) {
              fs.mkdirSync(adjPath);
            }
            fs.writeFileSync(adjPath + "/" + museumName, JSON.stringify(adj),'utf-8');
            /* since Node is all asynchronous, a normal for cannot be used to
            * iterate over the areas, since the area variable will immediately get to the last value
            * in the object before the requests have been fully handled, therefore an async library
            * was needed to reduce the number of calls to the DB */
            async.each(attractions, function (area, callback) {
              request({
                url: serverName + "aream/",
                method: "POST",
                json: {
                  name: area.name,
                  museum: {
                    id: id_museum
                  }
                }
              }, function (error, response, body) {
                if (!error && response.statusCode === 201) {

                  logger.info(path, response.statusCode, "Area " + area.name + " added");
                  loc = response.headers.location;
                  id = loc.match(regex);
                  id_area = id[0];
                  logger.info(path, "Area id:", id_area);

                  for (var i = 0; i < area.attractions.length; i++) {
                    var attraction = area.attractions[i];
                    attraction.areaM = {id: id_area};
                  }
                  logger.debug(JSON.stringify(area.attractions));
                  request({
                    url: serverName + "attractionm/",
                    method: "POST",
                    json: area.attractions
                  }, function (error, response, body) {
                    if (!error && response.statusCode === 201) {
                      logger.info(path, response.statusCode, "Attractions of area " + area.name + " added");
                    } else if (response.statusCode === 500) {
                      logger.error(path, response.statusCode, "Error in adding attractions of area " + area.name);
                    } else logger.error(response.statusCode);
                    //Needed to signal the end of a single iteration of async.each()
                    callback();
                  });

                } else logger.error(path, response.statusCode, "Error while adding area " + area.name);
              });
              // Callback function for async.each(), called one it has finished the iteration
            }, function (err) {
              if (err)
              res.sendStatus(500);
              else
              res.sendStatus(200);
              return;
            });
          } else {
            logger.error(path, response.statusCode, "Error while adding museum " + museumName);
            return;
          }
        });
        cb();
      } else if (response.statusCode === 400) {
        logger.error(path, response.statusCode, "Error while adding city " + city);
        res.sendStatus(500);
        return;
      }
    })
  },
  function(callback) {
    //Hnalde node4j stuff
    request({
      url: serverName + "adj/museumId=" + id_museum,
      method: "POST",
      body: JSON.stringify(adj),
      headers: [{
        'content-type': 'text/plain'
      }]
    }, (error, response, body) => {
      if(error)
      logger.error(error);
      logger.debug(response.statusCode);
      res.sendStatus(200);
    });
  }
], function(error) {

});
});

museumRouter.route('/city')
.get((req,res) => {
  let city = req.query.city;
  let region = req.query.region;
  rp.get({
    uri: serverName + "museums/city/?city=" + city + "&region=" + region,
  })
    .then((body) => {
      res.status(200).send(body);
    })
    .catch((err) => {
      res.send(500);
    })
});

museumRouter.route('/:museum_id')
  .get((req,res) => {
    request({
      url: serverName  + 'attractionm/museumId=' + req.params.museum_id,
      method: "GET",
      json: true,
      headers: [{
        'content-type': 'application/json'
      }]
    }, function(error, response, body) {
      logger.info(pathName + "request statusCode: " + response.statusCode);
      if (!error & response.statusCode === 200) {
        logger.info(pathName + "OK");
        res.status(response.statusCode);
        logger.debug(JSON.stringify(body));
        res.send(body);
      } else {
        res.status(response.statusCode);
        res.send("error /get_attraction");
        logger.info(pathName + "failed!");
      }
    });
  })
  .put((req,res) => {

  })
  .delete((req,res) => {

  });

app.use('/museums',museumRouter);

app.post('/raw', (req, res) => {

  // output the headers
  console.log(req.headers);

  // capture the encoded form data
  req.on('data', (data) => {
    console.log(data.toString());
  });

  // send a response when finished reading
  // the encoded form data
  req.on('end', () => {
    res.send('ok');
  });
});

app.post('/get_aream', function(req, res) {
  path = '[' + req.path + '] ';
  logger.info(pathName + req.method);
  res.set('Content-Type', 'application/json');
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.set("Access-Control-Allow-Credentials", true);
  museumId = req.body.id;
  logger.info(path, "Museum id:", museumId);

  request({
    url: serverName + "aream/museumId=" + museumId,
    method: "GET",
    json: true,
    headers: [{
      'content-type': 'application/json'
    }]

  }, function(error, response, body) {

    if (!error & response.statusCode === 200) {
      logger.info(pathName + "***  get response : ", body);
      res.status(response.statusCode);
      res.send(body);
      return;
    } else {
      logger.info(pathName + "/get_aream failed!: ");
      return;
    }
  });
});

app.post('/adj', (req,res) => {
  var adj = req.body;
  request({
    url: serverName + "adj/museumId=" + 1,
    method: "POST",
    body: JSON.stringify(adj),
    headers: [{
      'content-type': 'text/plain'
    }]
  }, (error, response, body) => {
    if(error)
    logger.error(error);
    logger.debug(response.statusCode);
    res.sendStatus(200);
  });
});

app.get('/adj', (req,res) => {

  request({
    url: serverName + "adj/museumId=" + 1,
    method: "GET",
    headers: [{
      'content-type': 'application/json'
    }]
  }, (error, response, body) => {
    if(error)
    logger.error(error);
    logger.debug(response.statusCode);
    res.status(200).send(JSON.parse(body));
  });
});

module.exports = app;
