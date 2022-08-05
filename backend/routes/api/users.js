// backend/routes/api/users.js
const express = require('express')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();

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
router.post('/', validateSignup, async (req, res, next) => {
  const { firstName, lastName, email, password, username } = req.body;

  const takenEmail = await User.findOne({
    where: {
      email
    }
  })

  if (takenEmail) {
    const err = new Error('User already exists')
    err.errors = { email: "User with that email already exists" }
    err.status = 403;
    next(err)
  }

  const takenUsername = await User.findOne({
    where: {
      username
    }
  })

  if (takenUsername) {
    const err = new Error('User already exists')
    err.errors = { email: "User with that username already exists" }
    err.status = 403;
    next(err)
  }

  let user = await User.signup({ firstName, lastName, email, username, password });
  const token = setTokenCookie(res, user);
  const userObj = user.toSafeObject()
  userObj.token = token
  res.json({
    userObj
  });
}
);

module.exports = router;
