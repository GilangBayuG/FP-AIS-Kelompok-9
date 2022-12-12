const {Sequelize, Model, DataTypes} = require("sequelize");
const sequelize = new Sequelize("sqlite::memory:");
const database= require("../config/database")
const db= database.db

exports.usermodel = db.define('user', {
    username: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    saldo: {
      type: Sequelize.INTEGER
    }
  });
