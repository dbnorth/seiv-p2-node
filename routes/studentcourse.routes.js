module.exports = app => {
  const StudentCourses = require("../controllers/studentcourse.controller.js");

  var router = require("express").Router();

  // Create a new StudentCourse
  router.post("/", StudentCourses.create);

  // Retrieve all StudentCourses
  router.get("/", StudentCourses.findAll);

  // Retrieve a single StudentCourse with id
  router.get("/:id", StudentCourses.findOne);

  // Update a StudentCourse with id
  router.put("/:id", StudentCourses.update);

  // Delete a StudentCourse with id
  router.delete("/:id", StudentCourses.delete);

  // Delete all StudentCourses
  router.delete("/", StudentCourses.deleteAll);

  app.use('/api/studentcourses', router);
};