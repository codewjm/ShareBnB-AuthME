const { validationResult, query, check } = require('express-validator');

// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, _res, next) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    const errors = {}
    validationErrors.array().forEach((err) => {
      errors[err.param] = err.msg
    })
    const err = Error('Validation error');
    err.title = 'Validation error';
    err.errors = errors;
    err.status = 400;
    next(err);
  }
  next();
};

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

const validateQuery = [
  query("page")
    .optional()
    .isInt({ min: 0, max: 10 })
    .withMessage("Page must be greater than or equal to 0"),
  query("size")
    .optional()
    .isInt({ min: 0, max: 20 })
    .withMessage("Size must be greater than or equal to 0"),
  query("maxLat")
    .optional()
    .isDecimal({ force_decimal: true })
    .withMessage("Maximum latitude is invalid"),
  query("minLat")
    .optional()
    .isDecimal({ force_decimal: true })
    .withMessage("Minimum latitude is invalid"),
  query("minLng")
    .optional()
    .isDecimal({ force_decimal: true })
    .withMessage("Minimum longitude is invalid"),
  query("maxLng")
    .optional()
    .isDecimal({ force_decimal: true })
    .withMessage("Maximum longitude is invalid"),
  query("minPrice")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Minimum price must be greater than or equal to 0"),
  query("maxPrice")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Maximum price must be greater than or equal to 0"),
  handleValidationErrors
];

const validateBooking = [
  check("startDate")
  .isDate()
  .withMessage("startDate invalid"),
  check("endDate")
  .isDate().
  withMessage("endDate invalid"),
  handleValidationErrors
];



module.exports = {
  handleValidationErrors,
  validateSpot,
  validateQuery,
  validateBooking
};
