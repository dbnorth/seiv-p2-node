const db = require("../models");
const Advisor = db.advisor;
const Op = db.Sequelize.Op;

// Create and Save a new Advisor
exports.create = (req, res) => {
  if (!req.body.firstName) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Advisor
  const advisor = {
    id: req.body.id,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    dept: req.body.dept
  };

  // Save Advisor in the database
  Advisor.create(advisor)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Advisor."
      });
    });
};

// Retrieve  Advisor with idNumberfrom the database.
exports.findAll = (req, res) => {

  Advisor.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Advisor."
      });
    });
};

// Find a single Advisor with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Advisor.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Advisor with id=" + id
      });
    });
};



// Update a Advisor by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Advisor.update(req.body, {
      where: {
        id: id
      }
    })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Advisor was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Advisor with id=${id}. Maybe Advisor was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Advisor with id=" + id
      });
    });
};

// Delete a Advisor with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Advisor.destroy({
      where: {
        id: id
      }
    })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Advisor was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Advisor with id=${id}. Maybe Advisor was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Advisor with id=" + id
      });
    });
};

// Delete all Advisor from the database.
exports.deleteAll = (req, res) => {
  Advisor.destroy({
      where: {},
      truncate: false
    })
    .then(nums => {
      res.send({
        message: `${nums} Advisors were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all Advisors."
      });
    });
};