'use strict';

const {hashPassword} = require('../helpers/hashPassword')


const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    static associate(models) {

      User.hasMany(models.Room, {foreignKey: 'CreatorId'})
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,

      allowNull: false,

      validate: {
        notNull: {
          msg : 'Username cannot be null'
        },
        notEmpty: {
          msg: 'Username cannot be empty'
        }
      }
    },
    email: {
      type: DataTypes.STRING,

      allowNull: false,

      validate: {
        isEmail: {
          msg : "Invalid email format"
        },

        notNull: {
          msg: "Email is required"
        },
        notEmpty: {
          msg : "Email is required"
        }
      },

      unique: {
        msg : "Email must be unique"
      },

      
    },
    password: {
      type: DataTypes.STRING,

      allowNull: false,

      validate: {
        notNull: {
          msg: "Password is required"
        },
        notEmpty: {
          msg : "Password is required"
        }
      },
      
    },
    imgUrl: {
      type: DataTypes.TEXT,
      defaultValue: 'https://i.pinimg.com/originals/6c/e5/e6/6ce5e69ac9adc07d55d58cf7325b2e27.jpg',

      allowNull: false,

      validate: {
        notNull:{
          msg : 'imgUrl cannot be null'
        }
      },

    }
  }, {
    sequelize,
    modelName: 'User',
    hooks : {
      beforeCreate: (user) => {
        if (user.password) {      
          user.password = hashPassword(user.password);
        }
      },
      beforeUpdate: (user) => {
        if (user.password) {
          user.password = hashPassword(user.password);
        }
      },
    }
  });
  return User;
};