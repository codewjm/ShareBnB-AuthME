'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

    const validImages = [
      {
        spotId: 1,
        userId: 1,
        reviewId: 1,
        previewImage: true,
        url: 'HoustonURL',
      },
      {
        spotId: 2,
        userId: 2,
        reviewId: 2,
        previewImage: true,
        url: 'AustinURL',
      },
      {
        spotId: 3,
        userId: 3,
        reviewId: 3,
        previewImage: true,
        url: 'SanFranciscoURL',
      },
      {
        spotId: 4,
        userId: 4,
        reviewId: 4,
        previewImage: true,
        url: 'NewYorkURL',
      },
      {
        spotId: 5,
        userId: 5,
        reviewId: 5,
        previewImage: true,
        url: 'ChicagoURL',
      },

    ];

    return queryInterface.bulkInsert('Images', validImages);
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Images', {
      spotId: { [Op.in]: [2, 3, 4, 5] }
    }, {});
  }
};
