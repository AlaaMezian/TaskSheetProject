'use strict';

var sequelize = require('sequelize');
var bcrypt = require('bcrypt-nodejs');
var config = require('../config/main');


module.exports = (sequelize, DataTypes) => {
  var user = sequelize.define('user', {

    first_name: {
      type: DataTypes.STRING,
      allowNull: false
    },

    last_name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
      isEmail: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    //  role: {
    //    type: DataTypes.INTEGER,
    //    defaultValue: config.userRoles.user
    //  },
    supervisor_id: DataTypes.INTEGER,

    flags: {
      type: 'BIT(8)',
      defaultValue: 0,
    },
  },
    {
      tableName: 'user',
      underscored: true,
      timestamps: {
        defaultValue: DataTypes.NOW
      },
      _flags: {
        "password_changed": 1,
        "active": 2,
        
      }
    },

    {
      scopes: {
        isFlagged: function (flag) {
          if (typeof (this.options._flags[flag]) == 'undefined') {
            throw new Error('The flag (' + flag + ') does not exist in table (' + this.options.tableName + ')');
          }
          var value = this.options._flags[flag];
          return {
            where: ['(flags & ? = ?)', value, value]
          };
        },
        isNotFlagged: function (flag) {
          if (typeof (this.options._flags[flag]) == 'undefined') {
            throw new Error('The flag (' + flag + ') does not exist in table (' + this.options.tableName + ')');
          }
          var value = this.options._flags[flag];
          return {
            where: ['(flags & ? = 0)', value]
          };
        },


      }
    });
    //class methods
  user.generateHash = function generateHash(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  }

  user.associate = function (models) {
    models.user.hasMany(models.task);

  };

  //   user.associate = function (models) {
  //     user.supervisor_id.hasMany(user.id,{useJunctionTable: false})
  // };
  //instance method
  user.prototype.comparePasswords = function (password, callback) {
    bcrypt.compare(password, this.password, function (error, isMatch) {
      if (error) {
        return callback(error);
      }
      return callback(null, isMatch);
    });
  }
  // user.prototype.generateHash = function (password) {
  //   return bcrypt.hashSync(password, bycrypt.genSaltSync(8), null)
  // }
  return user;


};

