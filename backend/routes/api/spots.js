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

// Get details of a spot from an id
router.get('/:spotId', async (req, res, next) => {
  const spot = await Spot.findByPk(req.params.spotId, {
    include: [
      {
        model: Image,
        attributes: ["id", ["spotId", "imageableId"], "url"],
      },
      {
        model: User,
        as: "Owner",
        attributes: ['id', 'firstName', 'lastName']
      },
    ]
  })

  if (!spot) {
    const err = new Error("Spot couldn't be found");
    err.message = "Spot couldn't be found"
    err.status = 404;
    return next(err)
  }
  res.json(spot)
});


// Create a spot
router.post("/", requireAuth, validateSpot, async (req, res, next) => {
  req.body.ownerId = req.user.id
  const newSpot = await Spot.create(req.body);
  res.status(201);
  res.json(newSpot);
});

// Delete a spot
router.delete('/:spotId', restoreUser, requireAuth, async (req, res, next) => {
  const deleteSpot = await Spot.findByPk(req.params.spotId)
  if (!deleteSpot) {
    const err = new Error("Spot couldn't be found");
    err.message = "Spot couldn't be found"
    err.status = 404;
    return next(err)
  }
  if (deleteSpot.ownerId !== req.user.id) {
    const err = new Error("Forbidden")
    err.message = "Forbidden"
    err.status = 403
    return next(err)
  }
  if (deleteSpot && deleteSpot.ownerId === req.user.id) {
    deleteSpot.destroy()
    res.json({
      message: "Successfully deleted",
      statusCode: 200
    });
  }
})



// Edit a spot
router.put("/:spotId", restoreUser, requireAuth, validateSpot, async (req, res, next) => {
  const spot = await Spot.findByPk(req.params.spotId);
  if (spot && spot.ownerId === req.user.id) {
    spot.set(req.body);
    await spot.save();
    res.json(spot)
  }

  if (!spot) {
    const err = new Error("Spot couldn't be found");
    err.message = "Spot couldn't be found"
    err.status = 404;
    return next(err)
  }

  if (spot.ownerId !== req.user.id) {
    let err = new Error("Forbidden")
    err.status = 403
    return next(err)
  }
});


// Get all bookings for a spot based on the spot's id
router.get('/:spotId/bookings', restoreUser, requireAuth, async (req, res, next) => {
  const spotId = req.params.spotId
  const currentUser = req.user.id
  const spot = await Spot.findByPk(spotId)

  const owner = {
    User: {
      id: "",
      firstName: "",
      lastName: "",
    },
    id: "",
    spotId: "",
    userId: "",
    startDate: "",
    endDate: "",
    createdAt: "",
    updatedAt: "",
  };

  if (!spot) {
    const err = new Error("Spot couldn't be found")
    err.message = "Spot couldn't be found"
    err.status = 404
    return next(err)
  }
  if (currentUser === spot.ownerId) {
    const userBooking = await Booking.findAll({
      where: { spotId: spot.id },
      include: {
        model: User,
        attributes: [
          'id', 'firstName', 'lastName'
        ]
      }
    });
    const ownersBooking = userBooking.map((booking) =>
      Object.assign(owner, booking.toJSON())
    );
    return res.json({ Bookings: ownersBooking })
  } else {
    const userBooking = await Booking.scope('invalidOwner').findAll({
      where: { spotId: spot.id }
    });
    return res.json({ Bookings: userBooking })
  }
});


// Create a Booking from a Spot based on the Spot's id
module.exports = router;
