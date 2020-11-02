const db = require("../models");
const Session = db.session;
const Advisor = db.advisor;
const Student = db.student;
const Op = db.Sequelize.Op;
const authcofig = require('../config/auth.config.js');


var jwt = require("jsonwebtoken");
const { advisor } = require("../models");

// Login and create Session
exports.login = async (req, res) => {

  if (!req.body.accessToken) {
    console.log("accessToken");
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
  console.log("search Advisor");
  let  foundUser = false;
  await Advisor.findOne({
    where : {email:email}
  })
  .then(data => {
    if (data != null) {
      let advisor= data.dataValues;
      token = jwt.sign({ id: advisor.email }, authcofig.secret, {expiresIn: 86400}); // 24 hours
      user.email = advisor.email;
      user.advisorId = advisor.id;
      user.studentId = null;
      user.userId = advisor.id;
      user.firstName = advisor.firstName;
      user.roles = advisor.roles;
      foundUser = true;

    }
    }).catch(err => {
        console.log("Error 1");
        res.status(401).send({
          message: err.message || "Error looking up User"
        });
        return;
    });
      console.log("student search");
      await Student.findOne({
        where : {email:email}
      }
      )
      .then(data => {
        if (data != null) {         
            let student = data.dataValues;
            token = jwt.sign({ id: student.email }, authcofig.secret, {expiresIn: 86400}); // 24 hours
            user.email = student.email;
            user.advisorId = null;
            user.studentId = student.id;
            user.userId  = student.id;
            user.firstName = student.firstName;
            user.roles = student.roles;
            foundUser = true;
         }

      }).catch(err => {
        console.log("Error 1");
        res.status(401).send({
          message: err.message || "Error looking up User"
       });
        return;
    });
    console.log()
    if (!foundUser) {
      res.status(401).send({
        message: "User Not Found"
      });
      return;
    }
// Create a Session
  let tokenExpireDate =new Date();
  tokenExpireDate.setDate(tokenExpireDate.getDate() + 1);
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
      let userInfo = {
        user : user.firstName,
        studentId : user.studentId,
        advisorId: user.advisorId,
        userId : user.userId,
        roles : user.roles,
        token : session.token
      };

      res.send(userInfo);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Session."
      });
    });
  }

exports.logout = async (req, res) => {
    return;
};