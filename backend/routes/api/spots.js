const express = require('express');
const { check } = require('express-validator');
const {
  handleValidationErrors,
  validateQuery,
  validateSpot
} = require("../../utils/validation");
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { Spot, User, Image, Review, Booking, sequelize } = require('../../db/models');
const { Op, where, Model } = require("sequelize");
const router = express.Router();

// Get all spots
router.get('/', validateQuery, async (req, res) => {

  let { minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query;
  let query = {
    where: {
      lat: {
        [Op.and]: {},
      },
      lng: {
        [Op.and]: {},
      },
      price: {
        [Op.and]: {},
      },
    },
  }

  page = parseInt(req.query.page)
  size = parseInt(req.query.size)
  if (Number.isNaN(page)) page = 1;
  if (Number.isNaN(size)) size = 20;


  if (page >= 1 && size >= 1) {
    query.limit = size;
    query.offset = size * (page - 1);
  }


  if (minLat) {
    query.where.lat[Op.and][Op.gte] = parseInt(minLat);
  }
  if (maxLat) {
    query.where.lat[Op.and][Op.lte] = parseInt(maxLat);
  }
  if (minLng) {
    query.where.lng[Op.and][Op.gte] = minLng;
  }
  if (maxLng) {
    query.where.lng[Op.and][Op.lte] = maxLng;
  }
  if (minPrice) {
    query.where.price[Op.and][Op.gte] = minPrice;
  }
  if (maxPrice) {
    query.where.price[Op.and][Op.lte] = maxPrice;
  }


  const spots = await Spot.findAll(query);

  let spotArr = [];
  for (let spot of spots) {

    let thisSpot = spot.toJSON();

    const reviewData = await spot.getReviews({
      attributes: [
        [sequelize.fn("AVG", sequelize.col("stars")), "avgStars"],
      ],
    });

    const avgRating = reviewData[0].dataValues.avgStars;
    if (!avgRating) {
      thisSpot.avgRating = "Spot is not yet rated"
    } else {
      thisSpot.avgRating = Number(avgRating).toFixed(1);
    }

    // const avgRating = reviewData[0].dataValues.avgStars;
    // thisSpot.avgRating = Number(avgRating).toFixed(1);

    const image = await Image.findOne({
      where: {
        [Op.and]: {
          spotId: thisSpot.id,
          previewImage: true
        }
      }
    })

    if (image) {
      thisSpot.previewImage = image.dataValues.url
    }
    spotArr.push(thisSpot)
  }

  if (query.offset !== undefined) {
    query.offset = query.offset + 1
  };

  res.json({
    Spots: spotArr,
    page: query.offset,
    size: query.limit,
  });
})

// Get all Spots owned by current user
// add avgRating and previewImage after completing reveiws and images routes
router.get('/current', restoreUser, requireAuth, async (req, res, next) => {
  const spots = await Spot.findAll({
    where: {
      ownerId: req.user.id
    }
  })

  for (let spot of spots) {
    const reviewData = await spot.getReviews({
      attributes: [
        [sequelize.fn("AVG", sequelize.col("stars")), "avgStars"],
      ],
    });

    const avgRating = reviewData[0].dataValues.avgStars;
    if (!avgRating) {
      spot.dataValues.avgRating = "Spot is not yet rated"
    } else {
      spot.dataValues.avgRating = Number(avgRating).toFixed(1);
    }
    const image = await Image.findOne({
      where: {
        [Op.and]: {
          spotId: spot.id,
          previewImage: true
        }
      }
    })

    if (image) {
      spot.dataValues.previewImage = image.dataValues.url
    }
  }
  res.json({
    "Spots": spots
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
      {
         model: Review, attributes: [],
      }
    ],
    // attributes: {
    //   include: [
    //     [ sequelize.fn('COUNT', sequelize.col('stars')), 'numReviews'],
    //     [ sequelize.fn('AVG', sequelize.col('stars')), 'avgStarRating']
    //   ]
    // },

  })

  if (!spot) {
    const err = new Error("Spot couldn't be found");
    err.message = "Spot couldn't be found"
    err.status = 404;
    return next(err)
  }
  const reviewData = await spot.getReviews({
    attributes: [
      [sequelize.fn('COUNT', sequelize.col('stars')), 'numReviews'],
      [sequelize.fn('AVG', sequelize.col('stars')), 'avgStarRating'],
    ],
  });
  const numReviews = reviewData[0].dataValues.numReviews;
  const avgStarRating = reviewData[0].dataValues.avgStarRating;
  if (!numReviews) {
    spot.dataValues.numReviews = 0
  } if (!avgStarRating) {
    spot.dataValues.avgStarRating = "Spot is not yet rated"
  } else {
    spot.dataValues.numReviews = parseInt(Number(numReviews).toFixed(0));
    spot.dataValues.avgStarRating = parseInt(Number(avgStarRating).toFixed(1));
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

// Create an Image for a Spot
router.post('/:spotId/images', requireAuth, async (req, res, next) => {
  const spot = await Spot.findByPk(req.params.spotId)

  if (!spot) {
    const err = new Error("Spot couldn't be found")
    err.message = "Spot couldn't be found"
    err.status = 404
    next(err);
  } else if (spot.ownerId !== req.user.id) {
    const err = new Error("Forbidden")
    err.message = "Forbidden"
    err.status = 403
    return next(err)
  }
  const image = await Image.create({
    url: req.body.url,
    spotId: req.params.spotId,
    userId: req.user.id,
  })

  let imageData = {
    id: image.id,
    imageableId: image.spotId,
    url: image.url
  }

  res.json(imageData)
})



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
router.post("/:spotId/bookings", requireAuth, async (req, res, next) => {

  const spot = await Spot.findByPk(req.params.spotId)
  const { startDate, endDate } = req.body;

  if (!spot) {
    const err = new Error("Spot couldn't be found");
    err.message = "Spot couldn't be found";
    err.status = 404;
    next(err)
  }

  const spotBookings = await Booking.findAll({
    where: {
      spotId: req.params.spotId,
      [Op.and]: [
        {
          startDate: {
            [Op.lte]: endDate,
          },
        },
        {
          endDate: {
            [Op.gte]: startDate,
          }
        },
      ],
    },
  })

  if (spotBookings.length) {
    const err = new Error("Sorry, this spot is already booked for the specified dates")
    err.message = "Sorry, this spot is already booked for the specified dates"
    err.status = 403
    err.errors = {
      startDate: "Start date conflicts with an existing booking",
      endDate: "End date conflicts with an existing booking"
    }
    next(err)
  } else if (spot.ownerId === req.user.id) {
    const err = new Error("Forbidden");
    err.message = "Forbidden";
    err.status = 403;
    next(err);
  } else if (endDate <= startDate || endDate === null) {
    const err = new Error("Validation");
    err.message = "Validation error";
    err.status = 400;
    err.errors = { endDate: "endDate cannot be on or before startDate" }
    next(err);
  } else if (spot.ownerId !== req.user.id) {
    const newBooking = await Booking.create({
      spotId: req.params.spotId,
      userId: req.user.id,
      startDate,
      endDate,
    })
    return res.json(newBooking)
  }
});



// Create a Review for a Spot based on the Spot's id
router.post('/:spotId/reviews', requireAuth, async (req, res, next) => {
  const { review, stars } = req.body
  const spot = await Spot.findByPk(req.params.spotId);

  if (!spot) {
    const err = new Error("Spot couldn't be found")
    err.message = "Spot couldn't be found",
    err.status = 404
    next(err)
  }


  const reviewed = await Review.findAll({
    where: {
      [Op.and]: [
        { userId: req.user.id },
        { spotId: req.params.spotId }
      ],
    }
  })

  if (reviewed.length) {
    const err = new Error('User already has a review for this spot')
    err.message = "User already has a review for this spot",
    err.status = 403
    next(err)
  } else if (review.length < 1 || !/[1-5]/.test(stars)) {
    const err = new Error("Validation");
    err.message = "Validation error";
    err.status = 400;
    err.errors = {
      review: "Review text is required",
      stars: "Stars must be an integer from 1 to 5"
    }
    next(err)
  } else {
    const spotReview = await Review.create({
      userId: req.user.id,
      spotId: req.params.spotId,
      review,
      stars
    })
    res.status(201)
    res.json(spotReview)
  }
})

//Get all Reviews by a Spot's id
router.get('/:spotId/reviews', async (req, res, next) => {


  const spot = await Spot.findByPk(req.params.spotId)
  if (!spot) {
    const err = new Error("Spot couldn't be found")
    err.message = "Spot couldn't be found"
    err.status = 404
    next(err)
  }
  const spotReviews = await Review.findAll({
    where: { spotId: req.params.spotId }
  })

  for (let review of spotReviews) {
    const user = await review.getUser({
      attributes: ['id', 'firstName', 'lastName']
    });
    const image = await review.getImages({
      attributes: ['id', ['reviewId', 'imageableId'], 'url']
    });

    review.dataValues.Image = image
    review.dataValues.User = user.toJSON();
  }
  res.json({"Reviews": spotReviews})
})


module.exports = router;
