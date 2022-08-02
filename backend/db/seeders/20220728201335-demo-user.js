'use strict';
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        firstName: 'Adam',
        lastName: 'Silvero',
        email: 'asilvero98@user.io',
        username: 'SilveroAroundTheWorld',
        hashedPassword: bcrypt.hashSync('password1')
      },
      {
        firstName: 'Jacob',
        lastName: 'Wiley',
        email: 'jacobwiley@user.io',
        username: 'JacobsWorld',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        firstName: 'Patrick',
        lastName: 'Devlatano',
        email: 'devlatanocabana@user.io',
        username: 'patdevlov',
        hashedPassword: bcrypt.hashSync('password3')
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['SilveroAroundTheWorld', 'JacobsWorld', 'patdevlov'] }
    }, {});
  }
};
