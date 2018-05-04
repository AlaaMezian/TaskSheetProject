'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      first_name: {
        type: Sequelize.STRING,
        allowNull:false,
        notEmpty: true
      },
      last_name: {
        type: Sequelize.STRING,
        allowNull:false,
        notEmpty: true
      },
      supervisor_id:{
        type: Sequelize.INTEGER,
        allownull: true,
      },
      email: {
        type: Sequelize.STRING,
        allownull: false,
        validate: {
          isEmail: true,
          notEmpty: true,
          len: [1, 255]
        }
      },
      password: {
        type: Sequelize.STRING,
        allowNull:false,
        notEmpty: true,
        min: 6,                  
        max: 20, 
      },
      flags:{
        DataTypes:'BIT(8)',
        allownull: false,
        defaultvalue: '0',
      }},
      
    
    );
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
  }
};