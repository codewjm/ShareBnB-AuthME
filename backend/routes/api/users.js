// backend/routes/api/users.js
const express = require('express')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateSignup = [
  check('email')
  .exists({ checkFalsy: true })
  .isEmail()
  .withMessage('Invalid email'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Username is required'),
  check('firstName')
    .exists({ checkFalsy: true })
    .withMessage('First name is required'),
  check('lastName')
    .exists({ checkFalsy: true })
    .withMessage('Last name is required'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  // check('password')
  //   .exists({ checkFalsy: true })
  //   .isLength({ min: 6 })
  //   .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];
// Sign up
router.post(
  '/',
  validateSignup,
  async (req, res, next) => {
    const { firstName, lastName, email, password, username } = req.body;

    const takenEmail = await User.findOne({
      where: {
        email
      }
    })

    if(takenEmail) {
      const err = new Error('User already exists')
      err.status = 403;
      err.errors = { email: "User with that email already exists" }
      next(err)
    }

    const takenUsername = await User.findOne({
      where: {
        username
      }
    })

    if (takenUsername) {
      const err = new Error('User already exists')
      err.status = 403;
      err.errors = {email: "User with that username already exists"}
      next(err)
    }

    let user = await User.signup({ firstName, lastName, email, username, password });
    const token = setTokenCookie(res, user);
    user = user.toJSON()
    user.token = token
    res.json({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
      token: user.token
    });
}
);

module.exports = router;
