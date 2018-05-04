'use strict'
module.exports ={
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('permission', {
            id:{
              DataType:Sequelize.INTEGER,
              allowNull: false,
              autoIncrement: true,
              primaryKey: true,
            },
          
        
           
            Permission:{
                DataType:'BIT(8)',
                allowNull:false,
                defaultvalue:0,
            },
        }
           
        );
        down:(queryInterface,Sequelize) =>{
            return queryInterface.dropTable('permission');
        }
    }
    }