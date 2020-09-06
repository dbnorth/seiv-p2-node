module.exports = (sequelize, Sequelize) => {
  const Course = sequelize.define("course", {
    id: {
      type: Sequelize.INT
    },
    dept: {
      type: Sequelize.STRING
    },
    number: {
      type: Sequelize.STRING
    },
    level: {
      type: Sequelize.CHAR
    },
    hours: {
      type: Sequelize.INT
    },
    name: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    }
  });

  return Course;
};