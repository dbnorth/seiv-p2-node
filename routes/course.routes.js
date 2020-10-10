module.exports = app => {
  const Courses = require("../controllers/course.controller.js");
  const { authenticate,isAdmin,isAny } = require("../util/util.js");

  var router = require("express").Router();

  // Create a new Course
  router.post("/", [authenticate,isAdmin],Courses.create);

  // Retrieve all Courses
  router.get("/", [authenticate,isAny],Courses.findAll);

  // Retrieve a single Course with id
  router.get("/:id", [authenticate,isAdmin],Courses.findOne);

  // Update a Course with id
  router.put("/:id", [authenticate,isAdmin],Courses.update);

  // Delete a Course with id
  router.delete("/:id", [authenticate,isAdmin],Courses.delete);

  // Delete all Courses
  router.delete("/", [authenticate,isAdmin],Courses.deleteAll);

  app.use('/api/courses', router);
};