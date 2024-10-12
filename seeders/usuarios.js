'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Usuarios', [
      {
        firstName: 'Ruando',
        lastName: 'Deane',
        email: 'rd071997@example.com',
        password: '7777777', 
        profileImage: 'default.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        firstName: 'Aadam',
        lastName: 'Sandler',
        email: 'AdSand@example.com',
        password: '0000000',
        profileImage: 'default.jpg',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Usuarios', null, {});
  }
};
