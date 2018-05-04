'use strict'
var _=require('lodash');
module.exports=(sequelize,DataTypes)=>{
    var task =sequelize.define('task',{
        
        Date:DataTypes.DATEONLY,
        start_time:DataTypes.TIME,
        end_time:DataTypes.TIME,
        details:DataTypes.TEXT,
        flags:{
            type:'BIT(8)',
            defaultValue:0,
        }
      },
        {
        tableName: 'task',
        underscored: true,
        timestamps:{
        
            defaultValue:DataTypes.NOW
          },
        _flags:{
            "approved":1,
        },
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
         
        },
        });
        task.associate = function (models) {
          models.task.belongsTo(models.user, {
            foreignKey: {
              allowNull: false
            }
          }),
          models.task.belongsTo(models.project,{
            foreignKey:{
              allowNull:false
            }
          })
          }         
       
return task;
}