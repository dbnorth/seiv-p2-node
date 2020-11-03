const db = require("../models");
const Degree = db.degree;
const Op = db.Sequelize.Op;

// Create and Save a new Degree
exports.create = (req, res) => {
  if (!req.body.description) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Degree
  const degree = {
    id: req.body.id,
    dept: req.body.dept,
    description: req.body.description,
    hours : req.body.hours
  };

  // Save Degree in the database
  Degree.create(degree)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Degree."
      });
    });
};

// Retrieve  Degree with idNumberfrom the database.
exports.findAll = (req, res) => {
  const idNumber = req.query.idNumber;
  var condition = idNumber ? {
    idNumber: {
      [Op.like]: `%${idNumber}%`
    }
  } : null;

  Degree.findAll({
      where: condition
    })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

// Find a single Degree with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Degree.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Degree with id=" + id
      });
    });
};



// Update a Degree by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Degree.update(req.body, {
      where: {
        id: id
      }
    })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Degree was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Degree with id=${id}. Maybe Degree was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Degree with id=" + id
      });
    });
};

// Delete a Degree with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Degree.destroy({
      where: {
        id: id
      }
    })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Degree was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Degree with id=${id}. Maybe Studnet was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Degree with id=" + id
      });
    });
};

// Delete all Degree from the database.
exports.deleteAll = (req, res) => {
  Degree.destroy({
      where: {},
      truncate: false
    })
    .then(nums => {
      res.send({
        message: `${nums} Degree were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all Degrees."
      });
    });
};