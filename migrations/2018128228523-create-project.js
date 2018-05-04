'use strict'
module.exports ={
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('project', {
            id:{
              DataType:Sequelize.INTEGER,
              allowNull: false,
              autoIncrement: true,
              primaryKey: true,
            },
            Name:{
                DataType:STRING,
                allowNull:false,
            },

            
           
        });
        down:(queryInterface,Sequelize) =>{
            return queryInterface.dropTable('project');
        }
    }
    }