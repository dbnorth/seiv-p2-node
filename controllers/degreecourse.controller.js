const db = require("../models");
const DegreeCourse = db.degreecourse;
const Op = db.Sequelize.Op;

// Create and Save a new DegreeCourse
exports.create = (req, res) => {
  if (!req.body.degreeId || !req.body.courseId) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a DegreeCourse
  const degreeCourse = {
    id: req.body.id,
    degreeId: req.body.degreeId,
    courseId: req.body.courseId
  };

  // Save DegreeCourse in the database
  DegreeCourse.create(degreeCourse)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the DegreeCourse."
      });
    });
};


// Retrieve all DegreeCourses from the database.
exports.findAll = (req, res) => {
  const courseId = req.query.courseId;
  var condition = courseId ? {
    courseId: {
      [Op.like]: `%${courseId}%`
    }
  } : null;

  DegreeCourse.findAll({
      include :["degree","course"],
      where: condition
    })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving degreeCourse."
      });
    });
};


// Find a single DegreeCourse with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  DegreeCourse.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving DegreeCourse with id=" + id
      });
    });
};



// Update a DegreeCourse by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  DegreeCourse.update(req.body, {
      where: {
        id: id
      }
    })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "DegreeCourse was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update DegreeCourse with id=${id}. Maybe DegreeCourse was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating DegreeCourse with id=" + id
      });
    });
};

// Delete a DegreeCourse with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  DegreeCourse.destroy({
      where: {
        id: id
      }
    })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "DegreeCourse was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete DegreeCourse with id=${id}. Maybe DegreeCourse was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete DegreeCourse with id=" + id
      });
    });
};

// Delete all DegreeCourse from the database.
exports.deleteAll = (req, res) => {
  var condition = courseId ? {
    courseId: {
      [Op.like]: `%${courseId}%`
    }
  } : null;
  DegreeCourse.destroy({
      where: condition,
      truncate: false
    })
    .then(nums => {
      res.send({
        message: `${nums} DegreeCourses were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all DegreeCourses."
      });
    });
};