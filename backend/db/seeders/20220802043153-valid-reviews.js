'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {

    const validReviews = [
      {
        userId: 1,
        spotId: 2,
        review: 'The pool was interesting but I felt sick after swimming.',
        stars: 2
      },
      {
        userId: 2,
        spotId: 3,
        review: 'This place was indeed very charming.',
        stars: 4
      },
      {
        userId: 3,
        spotId: 4,
        review: 'The flying saucer did not disappoint and it must have been fun because I cannot remember a thing about our time there...',
        stars: 4
      },
      {
        userId: 4,
        spotId: 5,
        review: 'This spot lived up to the description!',
        stars: 5
      },
      {
        userId: 5,
        spotId: 6,
        review: 'This loft overlooked the skyline of Chicago and was beautiful at night.',
        stars: 5
      },
      {
        userId: 4,
        spotId: 5,
        review: 'This loft overlooked the skyline of Chicago and was beautiful at night.',
        stars: 4
      },
      {
        userId: 4,
        spotId: 3,
        review: 'This loft overlooked the skyline of Chicago and was beautiful at night.',
        stars: 3
      },
      {
        userId: 4,
        spotId: 2,
        review: 'This loft overlooked the skyline of Chicago and was beautiful at night.',
        stars: 3
      },
      {
        userId: 4,
        spotId: 1,
        review: 'This loft overlooked the skyline of Chicago and was beautiful at night.',
        stars: 1
      },
    ]
    return queryInterface.bulkInsert('Reviews', validReviews);
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Reviews', {
      spotId: { [Op.in]: [2, 3, 4, 5] }
    }, {});
  }
};
