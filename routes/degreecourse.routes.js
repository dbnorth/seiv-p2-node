module.exports = app => {
  const DegreeCourses = require("../controllers/degreecourse.controller.js");
  const { authenticate,isAdmin} = require("../util/util.js");

  var router = require("express").Router();

  // Create a new DegreeCourse
  router.post("/", [authenticate,isAdmin],DegreeCourses.create);

  // Retrieve all DegreeCourses
  router.get("/", [authenticate,isAny],DegreeCourses.findAll);

  // Retrieve a single DegreeCourse with id
  router.get("/:id", [authenticate,isAdmin],DegreeCourses.findOne);

  // Update a DegreeCourse with id
  router.put("/:id", [authenticate,isAdmin],DegreeCourses.update);

  // Delete a DegreeCourse with id
  router.delete("/:id", [authenticate,isAdmin],DegreeCourses.delete);

  // Delete all DegreeCourses
  router.delete("/", [authenticate,isAdmin],DegreeCourses.deleteAll);

  app.use('/api/degreecourses', router);
};