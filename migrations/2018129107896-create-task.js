'use strict'
module.exports ={
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('task', {
           id:{
            DataType: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
           },
           project_id:{
           DataTypes:Sequelize.INTEGER,
           allowNull:false,
           references:{
              model:'project',
              key:'id'
           }          
           },
           user_id:{
            DataType:Sequelize.INTEGER,
            allownull:false,
            references: {
               model: 'user',
               key: 'id'
             },
             
           },
           Date:{
               type:DataTypes.DATEONLY,
               allowNull:false
           },
           start_time:{
               type:DataTypes.TIME,
               allowNull:true,
           },
          end_time:{
               type:DataTypes.TIME,
               allowNull:true
          },
          details:{
              type:DataTypes.TEXT,
              allowNull:false
          },
          flags:{
                DataTypes:'BIT(8)',
                allownull: false,
                defaultvalue: '0',
              }
          });
          down:(queryInterface,Sequelize) =>{
            return queryInterface.dropTable('task');
        }
    }
}