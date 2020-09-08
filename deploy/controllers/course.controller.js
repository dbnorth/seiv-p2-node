const db = require("../models");
const Course = db.course;
const Op = db.Sequelize.Op;

// Create and Save a new Course
exports.create = (req, res) => {
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Course
  const course = {
    id: req.body.id,
    dept: req.body.dept,
    number: req.body.number,
    level: req.body.level,
    hours: req.body.hours,
    name: req.body.name,
    description: req.body.description
  };

  // Save Course in the database
  Course.create(course)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Course."
      });
    });
};

// Retrieve all Courses from the database.
exports.findAll = (req, res) => {
  const dept = req.query.dept;
  var condition = dept ? {
    dept: {
      [Op.like]: `%${dept}%`
    }
  } : null;

  Course.findAll({
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

// Find a single Course with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Course.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id
      });
    });

};

// Update a Course by the id in the request
exports.update = (req, res) => {

};

// Delete a Course with the specified id in the request
exports.delete = (req, res) => {

};

// Delete all Courses from the database.
exports.deleteAll = (req, res) => {

};