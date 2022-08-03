
// backend/routes/api/session.js
const express = require('express')
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const router = express.Router();

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateLogin = [
  check('credential')
    .exists({ checkFalsy: true })
    .notEmpty()
    .withMessage('Email or username is required'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Password is required'),
  handleValidationErrors
];


router.post(
  '/',
  validateLogin,
  async (req, res, next) => {
    const { credential, password } = req.body;

    const user = await User.login({ credential, password });

    if (!user) {
      const err = new Error('Login failed');
      err.message = 'Invalid credentials'
      err.status = 401;
      return next(err);
    }

    const logIn = user.toJSON();
    const token = setTokenCookie(res, user);
    return res.json({
      id: logIn.id,
      firstName: logIn.firstName,
      lastName: logIn.lastName,
      email: logIn.email,
      username: logIn.username,
      token
    });
  }
);

// Log out
router.delete(
  '/',
  (_req, res) => {
    res.clearCookie('token');
    return res.json({ message: 'success' });
  }
);

// Display current user
router.get(
  '/',
  restoreUser,
  requireAuth,
  (req, res) => {
    const { user } = req;
    if (user) {
      return res.json({
        user: user.toSafeObject()
      });
    } else return res.json({});
  }
);



module.exports = router;
