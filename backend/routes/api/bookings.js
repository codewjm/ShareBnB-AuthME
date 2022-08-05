const express = require('express');
const { validateBooking } = require("../../utils/validation");
const { requireAuth, restoreUser } = require('../../utils/auth');
const { Spot, User, Image, Review, Booking, sequelize } = require('../../db/models');
const { Op, where } = require("sequelize");
const router = express.Router();


// Get all of the Current User's Bookings
router.get('/current', restoreUser, requireAuth, async (req, res, next) => {

  const userBookings = await Booking.findAll({
      where: {
          userId: req.user.id
      },
      include: {
          model: Spot.scope('removeAttributes'),
      },
  })
  const image = await Image.findOne({
    where: {
        spotId: req.user.id
    }
})
  let bookingArr = []
  for(let booking of userBookings){
    const image = await Image.findOne({
      where: {
          spotId: booking.spotId
      }
  })
      let bookings = booking.toJSON()
      bookings.Spot.previewImage = image.dataValues.url
      bookingArr.push(bookings)
  }
  res.json({"Bookings": bookingArr})
})


// Edit a Booking
router.put('/:bookingId', validateBooking, requireAuth, restoreUser, async (req, res, next) => {
  const { startDate, endDate } = req.body
  const booking = await Booking.findByPk(req.params.bookingId);
  const bookingId = req.params.bookingId;

  if (!booking) {
    const err = new Error("Booking couldn't be found");
    err.message = "Booking couldn't be found";
    err.status = 404;
    next(err)
  }
  if (endDate <= startDate || endDate === null) {
    const err = new Error("Validation");
    err.message = "Validation error";
    err.status = 400;
    err.errors = { endDate: "endDate cannot be on or before startDate" }
    next(err);
    }
  if (new Date(booking.endDate) < new Date()) {
    const err = new Error("Past bookings can't be modified")
    err.message = "Past bookings can't be modified";
    err.status = 403
    return next(err)
  }
  let bookedDate = await Booking.findAll({
    where: {
      [Op.and]: [{
        startDate: {
          [Op.lte]: endDate
        },
      },
      {
        endDate: {
          [Op.gte]: startDate
        }
      }],
    }
  });

  if (bookedDate.length) {
    const err = new Error("Sorry, this spot is already bookedDate for the specified dates");
    err.message = "Sorry, this spot is already bookedDate for the specified dates";
    err.status = 403;
    err.errors = {
      startDate: "Start date conflicts with an existing booking",
      endDate: "End date conflicts with an existing booking"
    };
    next(err)
  }
  if (booking.userId !== req.user.id) {
    const err = new Error('Forbidden');
    err.message = 'Forbidden';
    err.status = 403;
    next(err);
  }
  booking.update({
    startDate,
    endDate,
    updatedAt: new Date(),
})
booking.save()
res.json(booking)
})

// Delete a Booking
router.delete('/:bookingId', restoreUser, requireAuth, async (req, res, next) => {
  const deleteBooking = await Booking.findByPk(req.params.bookingId)
  if (!deleteBooking) {
    const err = new Error("Booking couldn't be found");
    err.message = "Booking couldn't be found"
    err.status = 404;
    return next(err)
  }
  if (deleteBooking.userId !== req.user.id) {
    const err = new Error("Forbidden")
    err.message = "Forbidden"
    err.status = 403
    return next(err)
  }
  if (deleteBooking && deleteBooking.userId === req.user.id) {
    deleteBooking.destroy()
    res.json({
      message: "Successfully deleted",
      statusCode: 200
    });
  }
})

module.exports = router;
