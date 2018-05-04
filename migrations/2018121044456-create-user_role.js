import { O_WRONLY } from "constants";

'use strict'
module.exports ={
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('user_role', {
            id:{
                DataType:Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
              },
          
           
        });
        down:(queryInterface,Sequelize) =>{
            return queryInterface.dropTable('use_role');
        }
    }
    }