const db = require("../models");
const StudentCourse = db.studentcourse;
const Op = db.Sequelize.Op;

// Create and Save a new Course
exports.create = (req, res) => {
  if (!req.body.studentId) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a StudentCourse
  const student = {
    id: req.body.id,
    studentId: req.body.studentId,
    courseId: req.body.courseId,
    semesterId: req.body.semesterId,
    grade: req.body.grade
  };

  // Save StudentCourse in the database
  StudentCourse.create(studentCourse)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the studentCourse."
      });
    });
};

// Retrieve  StudentCourse with idNumberfrom the database.
exports.findAll = (req, res) => {
  const studentId = req.query.studentId;
  var condition = studentId ? {
    studentId: {
      [Op.like]: `%${studentId}%`
    }
  } : null;

  StudentCourse.findAll({
      where: condition
    })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving studnetCourse."
      });
    });
};

// Find a single StudentCourse with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  StudentCourse.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id
      });
    });
};



// Update a StudentCourse by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  StudentCourse.update(req.body, {
      where: {
        id: id
      }
    })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "StudentCourse was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update StudentCourse with id=${id}. Maybe StudentCourse was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating StudentCourse with id=" + id
      });
    });
};

// Delete a StudentCourse with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  StudentCourse.destroy({
      where: {
        id: id
      }
    })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "StudentCourse was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete StudentCourse with id=${id}. Maybe Studnet was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete StudentCourse with id=" + id
      });
    });
};

// Delete all StudentCourse from the database.
exports.deleteAll = (req, res) => {
  StudentCourse.destroy({
      where: {},
      truncate: false
    })
    .then(nums => {
      res.send({
        message: `${nums} StudentCourses were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all StudentCourses."
      });
    });
};