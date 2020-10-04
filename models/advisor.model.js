module.exports = (sequelize, Sequelize) => {
  const Advisor = sequelize.define("advisor", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      unique: true,
      allowNull: false,
      autoIncrement: true
    },
    firstName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING
    },
    dept: {
      type: Sequelize.STRING
    },
    roles: {
      type: Sequelize.STRING
    }
    
  }, {
    tableName: 'advisor'
  });
  return Advisor;
};