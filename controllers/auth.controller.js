const db = require("../models");
const Session = db.session;
const Advisor = db.advisor;
const Op = db.Sequelize.Op;

// Login and create Session
exports.login = async (req, res) => {
  if (!req.body.accessToken) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }
 console.log(req.body.email);
// get Google Info
  const {OAuth2Client} = require('google-auth-library');
  const client = new OAuth2Client('344429607870-mmsdb296ne3vcb7popn96mclv3jnhigv.apps.googleusercontent.com');
  const ticket = await client.verifyIdToken({
    idToken: req.body.accessToken,
    audience: '344429607870-mmsdb296ne3vcb7popn96mclv3jnhigv.apps.googleusercontent.com'
  });
  const payload= ticket.getPayload();
  console.log('Google payload is '+JSON.stringify(payload));
  const userid = payload['sub'];
  let email = payload['email'];
  let emailVerified = payload['email_verified'];
  let name = payload["name"];
  let pictureUrl = payload["picture"];

// get User by email

Advisor.findAll({
  where: {
    email : {[Op.eq] : email}
  }
})
.then(data => {
  let advisors = data;
})
.catch(err => {
  
});

let advisor = data[0];
// Create a Session
  const session = {
    token: req.body.token,
    email: advisor.email,
    advisorId : advisor.id,
    studentId : null,
    expireDate: new Date()
  };

  // Save Session in the database
  Session.create(session)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Session."
      });
    });
};

exports.logout = async (req, res) => {

    return;
  }