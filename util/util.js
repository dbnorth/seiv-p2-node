const db = require("../models");
const Session = db.session;
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");

export async function authenticate(req, db) {
  let auth = req.get("authorization");
  if (auth != null) {
    if (auth.startsWith("Bearer ")) 
    {
      let token = auth.slice(7);
      jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
          return res.status(401).send({
            message: "Unauthorized!"
          });
        }
        req.userId = decoded.id;
      });
      await Session.findOne({
        where : {token:token}
      }
      )
      .then(data => {
        let session = data.dataValue;
        if (session.length > 0)
          if (session.expDate > Date.now())

            return true;
         else
            return false;
        })
        .catch(err => {
          console.log(err.message);
        });

  }
  if (require) {
    throw new AuthError(req, {
      status: 401,
      code: "auth-required",
      message: "Authentication required"
    });
  }
}