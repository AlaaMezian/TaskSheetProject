'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('user', [{

        first_name: 'John',
        last_name: 'Doe',
        email: 'demo@demo.com',
        password: '1234',
        created_at:new Date(),
        updated_at:new Date()
      },
    {
      first_name: 'mohammmed',
      last_name: 'ali',
      email: 'ali@demo.com',
      password: '12345',
      created_at:new Date(),
      updated_at:new Date()
     
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
