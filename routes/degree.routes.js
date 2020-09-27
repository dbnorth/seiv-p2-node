module.exports = app => {
  const Degrees = require("../controllers/degree.controller.js");

  var router = require("express").Router();

  // Create a new Degree
  router.post("/", Degrees.create);

  // Retrieve all Degrees
  router.get("/", Degrees.findAll);

  // Retrieve a single Degree with id
  router.get("/:id", Degrees.findOne);

  // Update a Degree with id
  router.put("/:id", Degrees.update);

  // Delete a Degree with id
  router.delete("/:id", Degrees.delete);

  // Delete all Degrees
  router.delete("/", Degrees.deleteAll);

  app.use('/api/degrees', router);
};