module.exports = app => {
  const Students = require("../controllers/student.controller.js");
  const { authenticate,isAdminOrAdvisor,isAny } = require("../util/util.js");

  var router = require("express").Router();

  // Create a new Student
  router.post("/", [authenticate,isAdminOrAdvisor],Students.create);

  // Retrieve all Students
  router.get("/", [authenticate,isAdminOrAdvisor],Students.findAll);

  // Retrieve a single Student with id
  router.get("/:id", [authenticate,isAdminOrAdvisor],Students.findOne);

  // Update a Student with id
  router.put("/:id", [authenticate,isAny],Students.update);

  // Delete a Student with id
  router.delete("/:id", [authenticate,isAdminOrAdvisor],Students.delete);

  // Delete all Students
  router.delete("/", [authenticate,isAdminOrAdvisor],Students.deleteAll);

  app.use('/api/students', router);
};