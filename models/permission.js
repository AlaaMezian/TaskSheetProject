
'use strict';

module.exports =  (sequelize, DataTypes) => {
  var permission = sequelize.define('permission', {
   
    Permission: {
      type: 'BIT(8)'
    },
  },
    {
      tableName: 'permssion',
      timestamps: false,
      _Permission: {
        "add": 1,
        "edit": 2,
        "delete":4,
        "review_own_task":8,
        "approve_dependends_task":16,
        "review_dependents_tasks":32,
        "create_account":64,
        "active_account":128,
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
}
    );
    

  
    return permission;
  }
