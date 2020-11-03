module.exports = (sequelize, Sequelize) => {
  const Session = sequelize.define("session", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      unique: true,
      allowNull: false,
      autoIncrement: true
    },
    token: {
      type: Sequelize.STRING,
      allowNull: false
    },
    expireDate: {
      type: Sequelize.DATE,
      allowNull: false
    },
    advisorId: {
      type: Sequelize.STRING,
      allowNull: true
    },
    studentId: {
      type: Sequelize.STRING,
      allowNull: true
    }, 
  }, 
  {
    tableName: 'session'
  });
  return Session;
};