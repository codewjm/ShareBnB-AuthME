const express = require("express");
const { Spot, Image, Booking, Review, User } = require("../../db/models");
const { setTokenCookie, requireAuth, restoreUser } = require("../../utils/auth");
const { handleValidationErrors } = require('../../utils/validation');
const { check } = require('express-validator');
const { Op } = require("sequelize");
const router = express.Router();

// Delete and Image
router.delete("/:imageId", requireAuth, async (req, res, next) => {
  const deleteImg = await Image.findByPk(req.params.imageId);
  if (!deleteImg) {
    const err = new Error("Image couldn't be found");
    err.message = "Image couldn't be found"
    err.status = 404;
    next(err)
  }
  if(deleteImg.userId === req.user.id) {
    deleteImg.destroy()
    res.json({
      message: "Successfully deleted",
      statusCode: 200
    });
  } else {
    const err = new Error("Forbidden");
    err.message = "Forbidden";
    err.status = 403;
    next(err);
  }
});

module.exports = router;
