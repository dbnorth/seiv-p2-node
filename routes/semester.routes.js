module.exports = app => {
  const Semesters = require("../controllers/semester.controller.js");

  var router = require("express").Router();

  // Create a new Semester
  router.post("/", Semesters.create);

  // Retrieve all Semesters
  router.get("/", Semesters.findAll);

  // Retrieve a single Semester with id
  router.get("/:id", Semesters.findOne);

  // Update a Semester with id
  router.put("/:id", Semesters.update);

  // Delete a Semester with id
  router.delete("/:id", Semesters.delete);

  // Delete all Semesters
  router.delete("/", Semesters.deleteAll);

  app.use('/api/semesters', router);
};