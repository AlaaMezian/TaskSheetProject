'use strict'
var permission=require('./index');
module.exports =(sequelize ,DataTypes)=>{
  var role =sequelize.define('role',{
      role_name:DataTypes.ENUM('user','Supervisor','Viewer','Admin'),
     
      },
  
  {
  tableName: 'role',
  underscored: true,
  timestamps:false,
 
 
})  ;
    role.associate = function(models) {
    models.role.hasMany(models.permission);
    
  };
  
return role;
}