'use strict'
var _ =require('lodash');

module.exports =(sequelize ,DataTypes)=>{
  var user_role =sequelize.define('user_role',{
     
      
  },
  {
  tableName: 'user_role',
  timestamps: false,
 
});
user_role.associate = function (models) {
    models.user_role.belongsTo(models.user, {
      
      foreignKey: {
        underscored:true,
        allowNull: false
      }
    }),
  
    models.user_role.belongsTo(models.role,{
      foreignKey:{
        underscored:true,
        allowNull:false
      }
    });
}
return user_role;
}