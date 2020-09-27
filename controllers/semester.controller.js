const db = require("../models");
const Semester = db.semester;
const Op = db.Sequelize.Op;

// Create and Save a new Semester
exports.create = (req, res) => {
  if (!req.body.code) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Semester
  const semester = {
    id: req.body.id,
    code: req.body.code,
    startDate: req.body.startDate
  };

  // Save Semester in the database
  Semester.create(semester)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Semester."
      });
    });
};

// Retrieve all Semesters from the database.
exports.findAll = (req, res) => {
  const code = req.query.code;
  var condition = code ? {
    dept: {
      [Op.like]: `%${code}%`
    }
  } : null;

  Semester.findAll({
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

// Find a single Semester with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Semester.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Semester with id=" + id
      });
    });
};

// Update a Semester by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Semester.update(req.body, {
      where: {
        id: id
      }
    })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Semester was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Semester with id=${id}. Maybe Semester was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Semester with id=" + id
      });
    });
};

// Delete a Semester with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Semester.destroy({
      where: {
        id: id
      }
    })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Semester was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Semester with id=${id}. Maybe Semester was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Semester with id=" + id
      });
    });
};

// Delete all Semesters from the database.
exports.deleteAll = (req, res) => {
  Semester.destroy({
      where: {},
      truncate: false
    })
    .then(nums => {
      res.send({
        message: `${nums} Semesters were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all semesters."
      });
    });
};