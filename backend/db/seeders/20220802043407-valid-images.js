'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

    const validImages = [
      {
        spotId: 1,
        userId: 1,
        reviewId: 1,
        previewImage: true,
        url: 'https://a0.muscache.com/im/pictures/150c0bed-c97e-4180-98bd-51e049cd3015.jpg',
      },
      {
        spotId: 2,
        userId: 2,
        reviewId: 2,
        previewImage: true,
        url: 'https://a0.muscache.com/im/pictures/150c0bed-c97e-4180-98bd-51e049cd3015.jpg',
      },
      {
        spotId: 3,
        userId: 3,
        reviewId: 3,
        previewImage: true,
        url: 'https://a0.muscache.com/im/pictures/150c0bed-c97e-4180-98bd-51e049cd3015.jpg',
      },
      {
        spotId: 4,
        userId: 4,
        reviewId: 4,
        previewImage: true,
        url: 'https://a0.muscache.com/im/pictures/150c0bed-c97e-4180-98bd-51e049cd3015.jpg',
      },
      {
        spotId: 5,
        userId: 5,
        reviewId: 5,
        previewImage: true,
        url: 'https://a0.muscache.com/im/pictures/150c0bed-c97e-4180-98bd-51e049cd3015.jpg',
      },
      {
        spotId: 6,
        userId: 2,
        reviewId: 6,
        previewImage: true,
        url: 'https://a0.muscache.com/im/pictures/150c0bed-c97e-4180-98bd-51e049cd3015.jpg',
      },
      {
        spotId: 7,
        userId: 3,
        reviewId: 7,
        previewImage: true,
        url: 'https://a0.muscache.com/im/pictures/150c0bed-c97e-4180-98bd-51e049cd3015.jpg',
      },
      {
        spotId: 8,
        userId: 4,
        reviewId: 8,
        previewImage: true,
        url: 'https://a0.muscache.com/im/pictures/150c0bed-c97e-4180-98bd-51e049cd3015.jpg',
      },
      {
        spotId: 9,
        userId: 5,
        reviewId: 9,
        previewImage: true,
        url: 'https://a0.muscache.com/im/pictures/150c0bed-c97e-4180-98bd-51e049cd3015.jpg',
      },
      {
        spotId: 10,
        userId: 2,
        reviewId: 10,
        previewImage: true,
        url: 'https://a0.muscache.com/im/pictures/150c0bed-c97e-4180-98bd-51e049cd3015.jpg',
      },
      {
        spotId: 11,
        userId: 3,
        reviewId: 11,
        previewImage: true,
        url: 'https://a0.muscache.com/im/pictures/150c0bed-c97e-4180-98bd-51e049cd3015.jpg',
      },
      {
        spotId: 12,
        userId: 4,
        reviewId: 12,
        previewImage: true,
        url: 'https://a0.muscache.com/im/pictures/150c0bed-c97e-4180-98bd-51e049cd3015.jpg',
      },
    ];

    return queryInterface.bulkInsert('Images', validImages);
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Images', {
      spotId: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] }
    }, {});
  }
};
