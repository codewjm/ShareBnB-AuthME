// backend/utils/validation.js
const { validationResult } = require('express-validator');

// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = {}
    validationErrors.array().forEach((err) => {
      errors[err.param] = err.msg
    })

    // console.log(errors)
    const err = Error('Validation error');
    err.title = 'Validation error';
    err.errors = errors;
    err.status = 400;
    next(err);
  }
  next();
};

module.exports = { handleValidationErrors };
