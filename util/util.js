const db = require("../models");
const Session = db.session;
const Advisor = db.advisor;
const Student = db.student;

const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");


authenticate = (req,res,next) => {
  console.log("authenticate");
  let authHeader = req.get("authorization");
  if (authHeader != null) {
    if (authHeader.startsWith("Bearer ")) 
    {
      let token = authHeader.slice(7);
      jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
          return res.status(401).send({
            message: "Unauthorized! Expired Token, Login again"
          });
        }
       // req.userId = decoded.id;
      });
      Session.findOne({
        where : {token:token}
      }
      )
      .then(data => {
        let session = data.dataValues;
        if (session != null) {
          if (session.expireDate >= Date.now()){
            next();
            return;
          }
         else
            return res.status(401).send({
              message: "Unauthorized! Expired Token, Login again"
              });
        }
      })
      .catch(err => {
        console.log(err.message);
      });
    }
  }
  else {
    return res.status(401).send({
      message: "Unauthorized! No Auth Header"
    });
  }
};

isAdmin = (req, res, next) => {
  console.log("isAdmin");
  let authHeader = req.get("authorization");
  let token="";
  
  if (authHeader != null) {
    if (authHeader.startsWith("Bearer ")) 
    {
      token = authHeader.slice(7);
    }
    else 
      return res.status(401).send({
        message: "Unauthorized! missing Bearer"
        });
  }
  Session.findOne({
    where : {token:token}
  })
  .then(data => {
    let session = data.dataValues;
    if (session.advisorId != null) {
     Advisor.findByPk(session.advisorId)
        .then(data => {
            roles = data.dataValues.roles;
            if (roles=="Admin") {
              next();
            
              return;
            } 
            else
            res.status(403).send({
              message: "Requires Adviosor Role"});
        })
        .catch(error => {
          return res.status(401).send({
            message: "Error finding Advisor"
            });
        });
      }
     else
        return res.status(403).send({
          message: "Requires Advior role"
          });
    })        
    .catch(error => {
      return res.status(401).send({
        message: "Error finding Session"
        });
    });
  };

  isAdminOrAdvisor = (req, res, next) => {
      console.log("isAdminOrAdvisor");
      let authHeader = req.get("authorization");
      let token="";
      
      if (authHeader != null) {
        if (authHeader.startsWith("Bearer ")) 
        {
          token = authHeader.slice(7);
        }
        else 
          return res.status(401).send({
            message: "Unauthorized! missing Bearer"
            });
      }
      Session.findOne({
        where : {token:token}
      })
      .then(data => {
        let session = data.dataValues;
        if (session.advisorId != null) {
          Advisor.findByPk(session.advisorId)
            .then(data => {
                roles = data.dataValues.roles;
                if (roles=="Admin" || roles=="Advisor") {
                  next();
                
                  return;
                } 
                else
                res.status(403).send({
                  message: "Require Admin or Advisor Role"});
            })
            .catch(error => {
              return res.status(401).send({
                message: "Error finding Advisor"
                });
            });
          }
         else
            return res.status(403).send({
              message: "Require Admin or Advisor Role"
              });
        })            
        .catch(error => {
          return res.status(401).send({
            message: "Error finding Session"
            });
      });
    
    };

  isAny = (req, res, next) => {
        console.log("isAny");
        let authHeader = req.get("authorization");
        let token="";
        
        if (authHeader != null) {
          if (authHeader.startsWith("Bearer ")) 
          {
            token = authHeader.slice(7);
          }
          else 
            return res.status(401).send({
              message: "Unauthorized! missing Bearer"
              });
        }
        Session.findOne({
          where : {token:token}
        })
        .then(data => {
          let session = data.dataValues;
          if (session.advisorId != null) {
            Advisor.findByPk(session.advisorId)
              .then(data => {
                  roles = data.dataValues.roles;
                  if (roles=="Admin" || roles=="Advisor") {
                    next();
                    return;
                  } 
                  else
                  res.status(403).send({
                    message: "Requires Any Role!"});
              })
              .catch(error => {
                return res.status(401).send({
                  message: "Unauthorized! bad Token"
                  });
              });
           }
           else
           {
            if (session.studentId != null) {
              Student.findByPk(session.studentId)
                .then(data => {
                    roles = data.dataValues.roles;
                    if (roles=="Student") {
                      next();
                      return;
                    } 
                    else
                    res.status(403).send({
                      message: "Requires Any Role!"});
                })
                .catch(error => {
                  return res.status(401).send({
                    message: "Unauthorized! bad Token"
                    });
                });
              }
              else{
                res.status(403).send({
                  message: "No User in Session!"});
              }
            }
          }
          )
          .catch(error => {
            return res.status(401).send({
              message: "Unauthorized! bad Token"
            });
          })
        };
 

const auth = {
  authenticate: authenticate,
  isAdmin: isAdmin,
  isAdminOrAdvisor : isAdminOrAdvisor,
  isAny : isAny

};
module.exports = auth;