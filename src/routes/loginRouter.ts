import * as express   from 'express';
import * as rp        from 'request-promise';
import jwt = require('jsonwebtoken');
const serverName = "http://localhost:3200/";
const path = require('path');
const comuni = require(path.join(__dirname,'../assets/comuni.json'));
const loginRouter = express.Router();

/*loginRouter.post('/auth/admin', (req,res) => {

  let email = req.body.badgeid;
  let password = req.body.password;

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
});*/

loginRouter.get('/comuni', (req,res) => {
    res.send(comuni);
});

loginRouter.get('/organizzazioni', (req,res) => {
    rp.get({
        uri: serverName + "organizations",
        json: true
    }).then(organizations => {
        res.status(200).send(organizations);
    }).catch(err => {
        res.sendStatus(500);
    })

});

loginRouter.post('/register/admin', (req,res) => {
    let org = req.body.org;
    let city = req.body.city;
    let email = req.body.email;
    let password = req.body.password;

    console.log(req.body);
    /*rp.post({
        uri: serverName + "curator/register",
        json: req.body
    }).then(curator => {
        res.status(201).send(curator);
    }).catch(err => {
        res.sendStatus(500);
    })*/
});
export {loginRouter};
