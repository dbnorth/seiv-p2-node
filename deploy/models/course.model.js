module.exports = (sequelize, Sequelize) => {
  const Course = sequelize.define("course", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      unique: true,
      allowNull: false,
      autoIncrement: true
    },
    dept: {
      type: Sequelize.STRING,
      allowNull: false
    },
    number: {
      type: Sequelize.STRING,
      allowNull: false
    },
    level: {
      type: Sequelize.CHAR
    },
    hours: {
      type: Sequelize.INTEGER
    },
    name: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    }
  }, {
    tableName: 'course'
  });
  return Course;
};