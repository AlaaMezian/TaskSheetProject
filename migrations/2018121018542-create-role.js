'use strict'
module.exports ={
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('role', {
            id:{
              DataType:Sequelize.INTEGER,
              allowNull: false,
              autoIncrement: true,
              primaryKey: true,
            },
            role_name:{
                DataType:Sequelize.ENUM('User','Supervisor','Viewier','Admin'),
                allowNull:false,

            },
           
        });
        down:(queryInterface,Sequelize) =>{
            return queryInterface.dropTable('role');
        }
    }
    }