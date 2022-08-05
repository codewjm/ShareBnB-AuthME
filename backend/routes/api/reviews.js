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
  review.dataValues.Image = image
}
res.json({"Reviews": userReviews})
})




module.exports = router;
