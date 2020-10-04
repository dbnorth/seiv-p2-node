module.exports = app => {
  const Advisors = require("../controllers/advisor.controller.js");

  var router = require("express").Router();

  // Create a new Advisor
  router.post("/", Advisors.create);

  // Retrieve all Advisors
  router.get("/", Advisors.findAll);

  // Retrieve a single Advisor with id
  router.get("/:id", Advisors.findOne);

  // Update a Advisor with id
  router.put("/:id", Advisors.update);

  // Delete a Advisor with id
  router.delete("/:id", Advisors.delete);

  // Delete all Advisors
  router.delete("/", Advisors.deleteAll);

  app.use('/api/advisors', router);
};