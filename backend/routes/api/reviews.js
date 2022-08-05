const express = require('express');
const { check } = require('express-validator');
const { handleValidationErrors } = require("../../utils/validation");
const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { Spot, User, Image, Review, Booking, sequelize } = require('../../db/models');
const { Op, where, Model } = require("sequelize");
const router = express.Router();

// Get all reviews of the Current User
router.get('/current', restoreUser, requireAuth, async (req, res) => {

  const userReviews = await Review.findAll({
    where: {
      userId: req.user.id
    },
    include: {
      model: Spot.scope("removeAttributes")
    }
  })

  for (let review of userReviews) {
    const user = await review.getUser({
      attributes: ['id', 'firstName', 'lastName']
    });
    const spot = await review.getSpot({
      attributes: [
        'id',
        'ownerId',
        'address',
        'city',
        'state',
        'country',
        'lat',
        'lng',
        'name',
        'price']
    })
    const image = await review.getImages({
      attributes: ['id', ['reviewId', 'imageableId'], 'url']
    });

    review.dataValues.User = user.toJSON();
    review.dataValues.Spot = spot.toJSON();
    review.dataValues.Images = image
  }
  res.json({ "Reviews": userReviews })
})


// Add an Image to a Review based on the Review's id
router.post('/:reviewId/images', restoreUser, requireAuth, async (req, res, next) => {
  const { url } = req.body
  const review = await Review.findByPk(req.params.reviewId)

  if (!review) {
    const err = new Error("Review couldn't be found");
    err.message = "Review couldn't be found";
    err.status = 404
    next(err)
  } else if (review.userId !== req.user.id) {
    const err = new Error("Forbidden")
    err.message = "Forbidden"
    err.status = 403
    next(err)
  }
  const reviewImages = await Image.findAll({
    where: { spotId: review.spotId }
  })
  if (reviewImages.length >= 10) {
    const err = new Error("Maximum number of images for this resource was reached");
    err.message = "Maximum number of images for this resource was reached";
    err.status = 403
    next(err)
  }

  const image = await Image.create({
    url: url,
    userId: req.user.id,
    spotId: review.spotId,
    reviewId: req.user.id,

  })
  res.json({
    id: image.id,
    imageableId: image.spotId,
    url: image.url
  })
})

// Edit a Review
router.put('/:reviewId', requireAuth, restoreUser, async (req, res, next) => {
  const {review, stars} = req.body
  const thisReview = await Review.findByPk(req.params.reviewId)

  if(!thisReview){
    const err = new Error("Review couldn't be found")
    err.message = "Review couldn't be found",
    err.status = 404
    next(err)
  } else if (review.length < 1 || !/[1-5]/.test(stars)) {

    const err = new Error("Validation");
    err.message = "Validation error";
    err.status = 400;
    err.errors = {
      review: "Review text is required",
      stars: "Stars must be an integer from 1 to 5"
    }
    return next(err)
  }
  thisReview.update({review, stars})
  res.status(200)
  res.json(thisReview)
})

// Delete review
router.delete('/:reviewId', requireAuth, restoreUser, async (req, res, next) => {
  const deleteReview = await Review.findByPk(req.params.reviewId)

  if (!deleteReview){
    const err = new Error("Review couldn't be found");
    err.message = "Review couldn't be found"
    err.status = 404;
    return next(err)
  }
  if (deleteReview.userId !== req.user.id) {
    const err = new Error("Forbidden")
    err.message = "Forbidden"
    err.status = 403
    return next(err)
  }
  if (deleteReview && deleteReview.userId === req.user.id) {
    deleteReview.destroy()
    res.json({
      message: "Successfully deleted",
      statusCode: 200
    });
  }
})


module.exports = router;
