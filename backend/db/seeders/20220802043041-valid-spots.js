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
        description: 'You cannot go wrong wit this spot.',
        price: 255
      },
      {
        ownerId: 2,
        address: '222 Cygnus Avenue',
        city: 'Austin',
        state: 'TX',
        country: 'USA',
        lat: 40.123456,
        lng: -41.654321,
        name: 'Alien Abode',
        description: 'A very charming location.',
        price: 155
      },
      {
        ownerId: 3,
        address: '333 Orion Lane',
        city: 'San Francisco',
        state: 'CA',
        country: 'USA',
        lat: 50.123456,
        lng: -51.654321,
        name: 'Saucer Joy Ride',
        description: 'A very nice dwelling.',
        price: 145
      },
      {
        ownerId: 4,
        address: '444 Centaurus Street',
        city: 'New York',
        state: 'NY',
        country: 'USA',
        lat: 60.123456,
        lng: -61.654321,
        name: 'Supernova Pad',
        description: 'You will not regret booking this spot.',
        price: 140
      },
      {
        ownerId: 5,
        address: '555 Cassiopeia Avenue',
        city: 'Chicago',
        state: 'IL',
        country: 'USA',
        lat: 70.123456,
        lng: -72.654321,
        name: 'Come Find Us',
        description: 'We will give you access to our wine cellar.',
        price: 525
      },
      {
        ownerId: 2,
        address: '632 Green Street',
        city: 'Mobile',
        state: 'AL',
        country: 'USA',
        lat: 71.123456,
        lng: -73.654321,
        name: 'House Amongst Trees',
        description: 'This is a very nice place with friendly neighbors.',
        price: 550
      },
      {
        ownerId: 3,
        address: '787 Pier Avenue',
        city: 'Phoenix',
        state: 'AZ',
        country: 'USA',
        lat: 73.123456,
        lng: -74.654321,
        name: 'Hot Spot Phoenix',
        description: 'You cannot get enough of this spot; I promise.',
        price: 177
      },
      {
        ownerId: 4,
        address: '871 Rapid Street',
        city: 'Rapid City',
        state: 'SD',
        country: 'USA',
        lat: 74.123456,
        lng: -75.654321,
        name: 'Rapid House',
        description: 'This spot offers all amenities and is two stories',
        price: 120
      },
      {
        ownerId: 5,
        address: '509 Drain Avenue',
        city: 'Auburn',
        state: 'AL',
        country: 'USA',
        lat: 75.123456,
        lng: -76.654321,
        name: 'Auburn Spot',
        description: 'The place is great with a secret pool.',
        price: 330
      },
      {
        ownerId: 2,
        address: '3375 Atlanta Avenue',
        city: 'Atlanta',
        state: 'GA',
        country: 'USA',
        lat: 76.123456,
        lng: -77.654321,
        name: 'Cool Spot Atlanta',
        description: 'A great spot in Atlanta.',
        price: 120
      },
      {
        ownerId: 3,
        address: '125 Apple Avenue',
        city: 'Savannah',
        state: 'GA',
        country: 'USA',
        lat: 77.123456,
        lng: -78.654321,
        name: 'Savannah House',
        description: 'A nice breezy spot.',
        price: 420
      },
      {
        ownerId: 4,
        address: '275 Great Street',
        city: 'Miami',
        state: 'FL',
        country: 'USA',
        lat: 78.123456,
        lng: -79.654321,
        name: 'Jungle House Spot',
        description: 'Oddly enough, a jungle in Florida',
        price: 350
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
          'Mobile',
          'Phoenix',
          'Rapid City',
          'Auburn',
          'Atlanta',
          'Savannah',
          'Miami'
        ]
      }
    }, {});
  }
};
