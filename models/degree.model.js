module.exports = (sequelize, Sequelize) => {
  const Degree = sequelize.define("degree", {
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
    description: {
      type: Sequelize.STRING,
      allowNull: false
    }

  }, {
    tableName: 'degree'
  });
  return Degree;
};