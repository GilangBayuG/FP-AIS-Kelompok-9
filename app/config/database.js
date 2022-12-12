const {Sequelize} = require('sequelize');

exports.db = new Sequelize('gopay', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
  });
  