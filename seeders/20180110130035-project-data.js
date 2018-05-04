'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
 
      return queryInterface.bulkInsert('project', [{
        name: 'task sheet project ',
        flags: 1,
        created_at:new Date(),
        updated_at:new Date()
      }], {});
    
  },

  down: (queryInterface, Sequelize) => {
  
      return queryInterface.bulkDelete('project', null, {});
    
  }
};
