const request = require('request');
const rp = require('request-promise');
const jwt = require('jsonwebtoken');
var app = require('./common');
var config = require('./src/config/config.json');
var logger = require('./logger');

var serverUrl = config.serverUrl;
var appName = config.webapp;
var serverName = serverUrl  + appName;
var serverNode = config.serverNode;

app.post('/admin_login', (req, res) => {
    var path = '[' + req.path + '] ';
    var uid = req.body.badgeid;
    var upwd = req.body.password;
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Location");
    res.set("Access-Control-Allow-Credentials", true);

    rp({
      uri: serverName + "curator/auth",
      method: "POST",
      body: req.body,
      json: true,
      resolveWithFullResponse: true
    })
      .then((response) => {
        var token = jwt.sign(payload, app.get('superSecret'), {
        expiresIn: "24h"// expires in 24 hours
      });
      res.json({
        success: true,
        message: 'Enjoy your token!',
        token: token
      });
        res.sendStatus(200);
      })
      .catch((err) => {
        res.sendStatus(404);
      });
});

app.get('/logout_admin', function (req, res) {
    logger.info("[/logout-admin] Logging administrator out");
    req.session.destroy();
    res.status(200).location(serverNode).end();
});

app.post('/registration', function (req, res) {
    logger.info("*** POST '/registration'");
    res.setHeader('Content-Type', 'application/json');
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", true);

    name = req.body.name;
    surname = req.body.surname;
    badgeId = req.body.badgeId;
    email = req.body.email;
    password = req.body.pwd;

    request({
        url: serverName + "curator/",
        method: "POST",
        json: {
            name: name,
            surname: surname,
            badgeid: badgeId,
            email: email,
            password: password
        }
    }, function (error, response, body) {
        logger.info("Request statusCode: " + response.statusCode);
        if (!error & response.statusCode === 204) {
            logger.info("***  get response : ", body);
            res.send({
                redirect: serverName + 'curatore'
            });
            return;
        } else {
            logger.error("registration failed!: ");
            return;
        }
    });
});

module.exports = app;
