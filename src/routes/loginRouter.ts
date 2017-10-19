import * as express   from 'express';
import * as rp        from 'request-promise';
import jwt = require('jsonwebtoken');

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

export {loginRouter};
