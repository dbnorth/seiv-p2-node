module.exports = {
  HOST: 'localhost',
  USER: 'admin',
  PASSWORD: 'passwordt0',
  DB: 'course',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};