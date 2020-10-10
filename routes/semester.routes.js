
module.exports = app => {
  const Semesters = require("../controllers/semester.controller.js");
  const { authenticate,isAdmin,isAny } = require("../util/util.js");
  var router = require("express").Router();

  // Create a new Semester
  router.post("/", [authenticate,isAdmin],Semesters.create);

  // Retrieve all Semesters
  router.get("/",[authenticate,isAny], Semesters.findAll);

  // Retrieve a single Semester with id
  router.get("/:id",[authenticate,isAdmin], Semesters.findOne);

  // Update a Semester with id
  router.put("/:id", [authenticate,isAdmin],Semesters.update);

  // Delete a Semester with id
  router.delete("/:id", [authenticate,isAdmin],Semesters.delete);

  // Delete all Semesters
  router.delete("/", [authenticate,isAdmin],Semesters.deleteAll);

  app.use('/api/semesters', router);
};