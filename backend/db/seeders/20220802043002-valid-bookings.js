'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    const validBookings = [
      {
        spotId: 1,
        userId: 1,
        startDate: '2022-09-15',
        endDate: '2022-09-17'
      },
      {
        spotId: 2,
        userId: 2,
        startDate: '2022-09-11',
        endDate: '2022-09-17'
      },
      {
        spotId: 3,
        userId: 3,
        startDate: '2022-08-13',
        endDate: '2022-08-18'

      },
      {
        spotId: 4,
        userId: 4,
        startDate: '2022-09-09',
        endDate: '2022-09-12'

      },
      {
        spotId: 5,
        userId: 5,
        startDate: '2022-10-05',
        endDate: '2022-10-09'
      },
    ]

    return queryInterface.bulkInsert('Bookings', validBookings);
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Bookings', {
      spotId: { [Op.in]: [1, 2, 3, 4, 5] }
    }, {});
  }
};
