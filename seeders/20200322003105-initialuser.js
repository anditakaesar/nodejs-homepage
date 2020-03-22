'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users',
    [
      {
        firstname: 'Andita',
        lastname: 'Fahmi',
        username: 'anditakaesar',
        email: 'admin@anditakaesar.com',
        password: '$2b$08$yki8MwYoTv8kqb5fbBwNYuU9WFMzAUV1EaZnQtvSOz0N9Ro2QcaB6',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users',
    {
      username: 'anditakaesar'
    });
  }
};
