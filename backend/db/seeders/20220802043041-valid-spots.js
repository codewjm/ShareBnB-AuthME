'use strict';



module.exports = {
  async up(queryInterface, Sequelize) {

    const validSpots = [
      {
        ownerId: 1,
        address: '111 Ursa Major Street',
        city: 'Houston',
        state: 'TX',
        country: 'USA',
        lat: 30.12345,
        lng: -31.12345,
        name: 'Space Place',
        description: 'We have shiny things and a pool of mercury',
        price: 500
      },
      {
        ownerId: 1,
        address: '222 Cygnus Avenue',
        city: 'Austin',
        state: 'TX',
        country: 'USA',
        lat: 40.123456,
        lng: -41.654321,
        name: 'Alien Abode',
        description: 'Charming alien hangout',
        price: 600
      },
      {
        ownerId: 2,
        address: '333 Orion Lane',
        city: 'San Francisco',
        state: 'CA',
        country: 'USA',
        lat: 50.123456,
        lng: -51.654321,
        name: 'Saucer Joy Ride',
        description: 'A secluded dwelling shaped like a flying saucer',
        price: 700
      },
      {
        ownerId: 2,
        address: '444 Centaurus Street',
        city: 'New York',
        state: 'NY',
        country: 'USA',
        lat: 60.123456,
        lng: -61.654321,
        name: 'Supernova Pad',
        description: 'A bright orange mansion near Manhattan',
        price: 800
      },
      {
        ownerId: 2,
        address: '555 Cassiopeia Avenue',
        city: 'Chicago',
        state: 'IL',
        country: 'USA',
        lat: 70.123456,
        lng: -71.654321,
        name: 'Come Find Us',
        description: 'Located on the 5th floor',
        price: 900
      },
    ];

    return queryInterface.bulkInsert('Spots', validSpots);
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Spots', {
      city: {
        [Op.in]: [
          'Houston',
          'Austin',
          'San Francisco',
          'New York',
          'Chicago',
        ]
      }
    }, {});
  }
};
