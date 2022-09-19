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
        description: 'Charming alien hangout',
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
        description: 'A secluded dwelling shaped like a flying saucer',
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
        description: 'A bright orange mansion near Manhattan',
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
        description: 'Located on the 5th floor',
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
        description: 'Located within a forest',
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
        description: 'Located on 5 acres of private land',
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
        description: 'The place is great with a pool',
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
        description: 'A great spot in Atlanta',
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
        description: 'A nice breezy spot',
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
        name: 'Beach House Miami',
        description: 'Located right on the beach',
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
