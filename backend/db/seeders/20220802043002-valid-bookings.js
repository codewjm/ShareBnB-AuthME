'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    const validBookings = [
      {
        spotId: 2,
        userId: 1,
        startDate: '2022-02-11',
        endDate: '2021-02-17'
      },
      {
        spotId: 3,
        userId: 2,
        startDate: '2022-07-13',
        endDate: '2022-07-18'

      },
      {
        spotId: 4,
        userId: 3,
        startDate: '2022-01-09',
        endDate: '2022-01-12'

      },
      {
        spotId: 5,
        userId: 4,
        startDate: '2022-10-05',
        endDate: '2022-10-09'

      },
    ]

    return queryInterface.bulkInsert('Bookings', validBookings);
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Bookings', {
      spotId: { [Op.in]: [2, 3, 4] }
    }, {});
  }
};
