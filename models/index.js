const dbConfig = require('../config/db.config.js');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
  define: {
    timestamps: false,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.course = require('./course.model.js')(sequelize, Sequelize);
db.student = require('./student.model.js')(sequelize, Sequelize);
db.degree = require('./degree.model.js')(sequelize, Sequelize);
db.semester = require('./semester.model.js')(sequelize, Sequelize);
db.studentcourse = require('./studentcourse.model.js')(sequelize, Sequelize);

db.course.hasMany(db.studentcourse, {
  as: 'studentcourse'
});
db.studentcourse.belongsTo(db.course, {
  foreignKey: 'courseId'
});

db.student.hasMany(db.studentcourse, {
  as: 'studentcourse'
});
db.studentcourse.belongsTo(db.student, {
  foreignKey: 'studentId'
});

db.semester.hasMany(db.studentcourse, {
  as: 'studentcourse'
});
db.studentcourse.belongsTo(db.semester, {
  foreignKey: 'semesterId'
});

db.degree.hasMany(db.student, {
  as: 'student'
});
db.student.belongsTo(db.degree, {
  foreignKey: 'degreeId'
});
module.exports = db;