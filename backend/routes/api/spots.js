const express = require('express');
const { check } = require('express-validator');
const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { Spot, User, Image, Review, Booking, sequelize } = require('../../db/models');
const { Op, where, Model } = require("sequelize");
const router = express.Router();

// validators
const validateSpot = [
  check('address')
    .exists({ checkFalsy: true })
    .withMessage('Street address is required'),
  check('city')
    .exists({ checkFalsy: true })
    .withMessage('City is required'),
  check('state')
    .exists({ checkFalsy: true })
    .withMessage('State is required'),
  check('country')
    .exists({ checkFalsy: true })
    .withMessage('Country is required'),
  check('lat')
    .exists({ checkFalsy: true })
    .withMessage("Latitude is not valid"),
  check('lng')
    .exists({ checkFalsy: true })
    .withMessage("Longitude is not valid"),
  check('name')
    .exists({ checkFalsy: true })
    .isLength({ max: 50 })
    .withMessage("Name must be less than 50 characters"),
  check('description')
    .exists({ checkFalsy: true })
    .withMessage("Description is required"),
  check('price')
    .exists({ checkFalsy: true })
    .withMessage("Price per day is required"),
  handleValidationErrors
];

// Get all spots
// add avgRating and previewImage after completing reveiws and images routes
router.get('/', async (req, res) => {
  const spots = await Spot.findAll();
  res.json({
    Spots: spots
  });
})

// Get all Spots owned by current user
// add avgRating and previewImage after completing reveiws and images routes
router.get('/current', restoreUser, requireAuth, async (req, res, next) => {
  const userSpot = await Spot.findAll({
    where: {
      ownerId: req.user.id
    }
  })
  res.json({
    "Spots": userSpot
  })
})





module.exports = router;
