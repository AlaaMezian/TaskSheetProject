'use strict'
var Sequelize = require('sequelize')
module.exports =(sequelize ,DataTypes)=>{
  var project =sequelize.define('project',{
      
    name:DataTypes.STRING,
      flags:{
        defaultValue:0,
          type:'BIT(8)',
          
      },
  },
  {
  tableName: 'project',
  underscored: true,
  timestamps:{
        
    defaultValue:DataTypes.NOW
  },
   _flags: {
    active: 1,
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
project.associate = function(models) {
  models.project.hasMany(models.task);
};


return project;
}