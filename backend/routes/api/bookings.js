const express = require('express');
const { check } = require('express-validator');
const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { Spot, User, Image, Review, Booking, sequelize } = require('../../db/models');
const { Op, where, Model } = require("sequelize");
const router = express.Router();


// Get all of the Current User's Bookings
router.get('/current', restoreUser, requireAuth, async (req, res, next) => {

  const bookingData = {
    id: "",
    spotId: "",
    Spot: {
      id: "",
      ownerId: "",
      address: "",
      city: "",
      state: "",
      country: "",
      lat: "",
      lng: "",
      name: "",
      price: "",
      previewImage: ""
    },
    userId: "",
    startDate: "",
    endDate: "",
    createdAt: "",
    updatedAt: ""
  }

  const bookings = await Booking.findAll({
    where: {
      userId: req.user.id
    },
    include: [
      {
        model: Spot.scope('removeAttributes')
      },
      {
        model: Spot,
        attributes: [
          "id",
          "ownerId",
          "address",
          "city",
          "state",
          "country",
          "lat",
          "lng",
          "name",
          "price",
        ]
      },
    ]
  });
  const userBooking = bookings.map((booking) =>
    Object.assign(bookingData, booking.toJSON())
  );
  return res.json({ Bookings: userBooking })
});






module.exports = router;
