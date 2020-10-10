module.exports = app => {
  const StudentCourses = require("../controllers/studentcourse.controller.js");
  const { authenticate,isAny } = require("../util/util.js");
  
  var router = require("express").Router();

  // Create a new StudentCourse
  router.post("/",[authenticate,isAny], StudentCourses.create);

  // Retrieve all StudentCourses
  router.get("/", [authenticate,isAny],StudentCourses.findAll);

  // Retrieve a single StudentCourse with id
  router.get("/:id",[authenticate,isAny], StudentCourses.findOne);

  // Update a StudentCourse with id
  router.put("/:id",[authenticate,isAny], StudentCourses.update);

  // Delete a StudentCourse with id
  router.delete("/:id",[authenticate,isAny], StudentCourses.delete);

  // Delete all StudentCourses
  router.delete("/", [authenticate,isAny],StudentCourses.deleteAll);

  app.use('/api/studentcourses', router);
};