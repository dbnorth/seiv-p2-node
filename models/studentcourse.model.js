module.exports = (sequelize, Sequelize) => {
  const StudentCourse = sequelize.define("studentcourse", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        unique: true,
        allowNull: false,
        autoIncrement: true
      },

      grade: {
        type: Sequelize.STRING,
      }
    },

    {
      tableName: 'student-course'
    });
  return StudentCourse;
};