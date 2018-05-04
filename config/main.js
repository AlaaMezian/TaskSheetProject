'use strict'
var config = module.exports;
config.keys = { 
    'secret': 'eypZAZy0CY^g9%KreypZAZy0CY^g9%Kr',
    
  };

var userRoles = config.userRoles = {
  guest: 1,    // ...001
  employee: 2,     // ...010
  admin: 4,     // ...100
  // admin : 8
};

config.accessLevels = {
  guest: userRoles.guest | userRoles.employee | userRoles.admin,    // ...111 that mean can be accessed by all three roles 
  employee: userRoles.employee | userRoles.admin,                       // ...110
  admin: userRoles.admin, // ...100
};