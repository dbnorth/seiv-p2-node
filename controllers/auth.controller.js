const db = require("../models");
const Session = db.session;
const Advisor = db.advisor;
const Student = db.student;
const Op = db.Sequelize.Op;
const authcofig = require('../config/auth.config.js');

var jwt = require("jsonwebtoken");

// Login and create Session
exports.login = async (req, res) => {
  if (!req.body.accessToken) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

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

  let user = {};
  let token = null;


// get User by email

await Advisor.findOne({
  where : {email:email}
}
)
.then(data => {
  if (data != null) {
    let advisor= data.dataValues;
    token = jwt.sign({ id: advisor.email }, authcofig.secret, {expiresIn: 86400}); // 24 hours
    user.email = advisor.email;
    user.advisorId = advisor.id;
    user.studentId = null;
    user.firstName = advisor.firstName;
    user.roles = advisor.roles;
  
  }
  })
  .catch(err => {
    console.log(err.message);
  });
  data = null;
  await Student.findOne({
    where : {email:email}
  }
  )
  .then(data => {
    if (data != null) {
      console.log("data",data);
        let student = data.dataValues;
        token = jwt.sign({ id: student.email }, authcofig.secret, {expiresIn: 86400}); // 24 hours
        user.email = student.email;
        user.advisorId = null;
        user.studentId = student.studentId;
        user.firstName = student.firstName;
        user.roles = student.roles;
     }
    
    })
    .catch(err => {
      console.log(err.message);
    });

// Create a Session
  const tokenExpireDate =new Date()+(24 * 60 * 60 * 1000);
  const session = {
    token: token,
    email: user.email,
    advisorId : user.advisorId,
    studentId : user.studentId,
    expireDate: tokenExpireDate
  };

  // Save Session in the database
  Session.create(session)
    .then(data => {
      var userInfo = {
        user : user.firstName,
        studentId : user.studentId,
        advisorId: user.advisorId,
        roles : user.roles,
        token : session.token
      };
      res.send(userInfo);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Session."
      });
    })
  }

exports.logout = async (req, res) => {
    return;
};