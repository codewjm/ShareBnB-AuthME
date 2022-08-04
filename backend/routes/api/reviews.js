const express = require('express');
const { check } = require('express-validator');
const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { Spot, User, Image, Review, Booking, sequelize } = require('../../db/models');
const { Op, where, Model } = require("sequelize");
const router = express.Router();

// Get all reviews of the Current User
router.get('/current', requireAuth, async (req, res) => {

  const reviewData = {
    id: "",
    userId: "",
    spotId: "",
    review: "",
    stars: "",
    createdAt: "",
    updatedAt: "",
    User: {
      id: "",
      firstName: "",
      lastName: ""
    },
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
    },
    Images: [
      {
        id: "",
        imageableId: "",
        urel: ""
      }
    ]
  }

  const userReviews = await Review.findAll({
    include: [
      {
        model: User,
        attributes: [
          "id",
          "firstName",
          "lastName"
        ]
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
          "price"
        ]
      },
      {
        model: Image,
        attributes: [
          "id",
          ["reviewId", "imageableId"],
          "url"
        ]
      }],
    where: { userId: req.user.id } // current user
  })
  const reviews = userReviews.map((review) =>
    Object.assign(reviewData, review.toJSON())
  );
  res.json({ Reviews: reviews })
});

module.exports = router;
