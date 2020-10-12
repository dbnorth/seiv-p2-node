module.exports = app => {
  const Degrees = require("../controllers/degree.controller.js");
  const { authenticate,isAdmin } = require("../util/util.js");

  var router = require("express").Router();

  // Create a new Degree
  router.post("/",[authenticate,isAdmin], Degrees.create);

  // Retrieve all Degrees
  router.get("/",[authenticate,isAdmin], Degrees.findAll);

  // Retrieve a single Degree with id
  router.get("/:id",[authenticate,isAdmin], Degrees.findOne);

  // Update a Degree with id
  router.put("/:id",[authenticate,isAdmin], Degrees.update);

  // Delete a Degree with id
  router.delete("/:id", [authenticate,isAdmin],Degrees.delete);

  // Delete all Degrees
  router.delete("/", [authenticate,isAdmin],Degrees.deleteAll);

  app.use('/api/degrees', router);
};