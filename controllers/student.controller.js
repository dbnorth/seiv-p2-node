const db = require("../models");
const Student = db.student;
const Op = db.Sequelize.Op;

// Create and Save a new Course
exports.create = (req, res) => {
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Student
  const student = {
    id: req.body.id,
    idNumber: req.body.idNumber,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    major: req.body.major
  };

  // Save Student in the database
  Student.create(student)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Course."
      });
    });
};

// Retrieve  Student with idNumberfrom the database.
exports.findIdNumber = (req, res) => {
  const idNumber = req.query.idNumber;
  var condition = idNumber ? {
    idNumber: {
      [Op.like]: `%${idNumber}%`
    }
  } : null;

  Student.findAll({
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

// Find a single Student with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Student.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id
      });
    });
};



// Update a Student by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Student.update(req.body, {
      where: {
        id: id
      }
    })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Student was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Student with id=${id}. Maybe Student was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Student with id=" + id
      });
    });
};

// Delete a Student with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Student.destroy({
      where: {
        id: id
      }
    })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Student was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Student with id=${id}. Maybe Studnet was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Studnet with id=" + id
      });
    });
};

// Delete all Student from the database.
exports.deleteAll = (req, res) => {
  Student.destroy({
      where: {},
      truncate: false
    })
    .then(nums => {
      res.send({
        message: `${nums} Studnets were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all Students."
      });
    });
};