module.exports = (sequelize, Sequelize) => {
  const Semester = sequelize.define("semester", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      unique: true,
      allowNull: false,
      autoIncrement: true
    },
    code: {
      type: Sequelize.STRING,
      allowNull: false
    },
    startDate: {
      type: Sequelize.DATEONLY,
      allowNull: false
    }

  }, {
    tableName: 'semester'
  });
  return Semester;
};