module.exports = app => {
  const Courses = require("../controllers/course.controller.js");

  var router = require("express").Router();

  // Create a new Course
  router.post("/", Courses.create);

  // Retrieve all Courses
  router.get("/", Courses.findAll);

  // Retrieve a single Course with id
  router.get("/:id", Courses.findOne);

  // Update a Course with id
  router.put("/:id", Courses.update);

  // Delete a Course with id
  router.delete("/:id", Courses.delete);

  // Delete all Courses
  router.delete("/", Courses.deleteAll);

  app.use('/api/courses', router);
};