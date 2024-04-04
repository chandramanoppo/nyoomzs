'use strict';

const {hashPassword} = require('../helpers/hashPassword')

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Room extends Model {

    static associate(models) {

      Room.belongsTo(models.User, {foreignKey: 'CreatorId'})
    }
  }
  Room.init({
    name: {
     type:  DataTypes.STRING,
     allowNull: false
    },
    roomId:{
      type: DataTypes.STRING,

      allowNull: false,

      unique: {
        msg: 'RoomId must be unique'
      },

      validate: {

        notNull: {
          msg : "RoomId cannot be Null"
        },
      }
    },
    password: {
      type:  DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Password cannot be empty"
        }
      },
     },
    CreatorId: {
      type:  DataTypes.INTEGER,
      allowNull: false,
      validate : {
        notNull: {
          msg: 'CreatorId cannot be Null'
        },
        notEmpty: {
          msg: "CreatorId cannot be empty"
        }
      },
      references: {
        model: 'Users',
        key : 'id'
      }
     },
     allowPublic :{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      validate: {
        notNull: {
          msg: "allowPublic Cannot be Null"
        }
      }
     }
  }, {
    sequelize,
    modelName: 'Room',
    hooks : {
      beforeCreate: (room) => {
        if (room.password) {      
          room.password = hashPassword(room.password);
        }
      },
      beforeUpdate: (room) => {
        if (room.password) {
          room.password = hashPassword(room.password);
        }
      },
    }
  });
  return Room;
};