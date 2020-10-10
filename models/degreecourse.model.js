module.exports = (sequelize, Sequelize) => {
  const DegreeCourse = sequelize.define("degreecourse", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      unique: true,
      allowNull: false,
      autoIncrement: true
    }

  }, {
    tableName: 'degreecourse'
  });
  return DegreeCourse;
};