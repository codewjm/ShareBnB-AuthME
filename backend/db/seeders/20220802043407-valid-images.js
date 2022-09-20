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
        url: 'https://a0.muscache.com/im/pictures/518d0c5c-05e3-4e86-8560-99fa3de852a3.jpg',
      },
      {
        spotId: 3,
        userId: 3,
        reviewId: 3,
        previewImage: true,
        url: 'https://a0.muscache.com/im/pictures/ef3128b5-7512-4596-976c-f766aeb77c23.jpg',
      },
      {
        spotId: 4,
        userId: 4,
        reviewId: 4,
        previewImage: true,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-50380458/original/3ee4ac64-f351-49da-b14c-016392a13bf5.jpeg',
      },
      {
        spotId: 5,
        userId: 5,
        reviewId: 5,
        previewImage: true,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-50064888/original/a0f955a7-793f-4fb0-a5b6-561c30e26b21.jpeg',
      },
      {
        spotId: 6,
        userId: 2,
        reviewId: 6,
        previewImage: true,
        url: 'https://a0.muscache.com/im/pictures/7907b90c-7c9b-4ffe-bc84-5e2fb2b11eea.jpg',
      },
      {
        spotId: 7,
        userId: 3,
        reviewId: 7,
        previewImage: true,
        url: 'https://a0.muscache.com/im/pictures/74252939/6e004cce_original.jpg',
      },
      {
        spotId: 8,
        userId: 4,
        reviewId: 8,
        previewImage: true,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-29463373/original/873c5b6b-88cc-4113-b249-b3a3ea53908c.jpeg',
      },
      {
        spotId: 9,
        userId: 5,
        reviewId: 9,
        previewImage: true,
        url: 'https://a0.muscache.com/im/pictures/ec48e9c8-dc48-439e-b1df-0ba1a39965a7.jpg',
      },
      {
        spotId: 10,
        userId: 2,
        reviewId: 10,
        previewImage: true,
        url: 'https://a0.muscache.com/im/pictures/e26fdf0a-11a5-4901-af0a-82bedb308b24.jpg',
      },
      {
        spotId: 11,
        userId: 3,
        reviewId: 11,
        previewImage: true,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-48351190/original/7dfe2305-bd96-4051-a574-7a80fe553302.jpeg',
      },
      {
        spotId: 12,
        userId: 4,
        reviewId: 12,
        previewImage: true,
        url: 'https://a0.muscache.com/im/pictures/930b2498-a62b-420b-8e5d-a2b5e4447516.jpg',
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
