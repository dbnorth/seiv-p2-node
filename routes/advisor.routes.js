
module.exports = app => {
  const Advisors = require("../controllers/advisor.controller.js");
  const { authenticate,isAdmin,isAdvisorOrAdmin } = require("../util/util.js");

  var router = require("express").Router();

  // Create a new Advisor
  router.post("/", [authenticate,isAdmin],Advisors.create);

  // Retrieve all Advisors
  router.get("/", [authenticate,isAdmin],Advisors.findAll);

  // Retrieve a single Advisor with id
  router.get("/:id", [authenticate,isAdmin],Advisors.findOne);

  // Update a Advisor with id
  router.put("/:id", [authenticate,isAdminOrAdvisor],Advisors.update);

  // Delete a Advisor with id
  router.delete("/:id", [authenticate,isAdmin],Advisors.delete);

  // Delete all Advisors
  router.delete("/", [authenticate,isAdmin],Advisors.deleteAll);

  app.use('/api/advisors', router);
};