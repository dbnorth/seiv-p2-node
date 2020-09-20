module.exports = app => {
  const Students = require("../controllers/student.controller.js");

  var router = require("express").Router();

  // Create a new Student
  router.post("/", Students.create);

  // Retrieve all Students
  router.get("/", Students.findAll);

  // Retrieve a single Student with id
  router.get("/:id", Students.findOne);

  // Update a Student with id
  router.put("/:id", Students.update);

  // Delete a Student with id
  router.delete("/:id", Students.delete);

  // Delete all Students
  router.delete("/", Students.deleteAll);

  app.use('/api/students', router);
};