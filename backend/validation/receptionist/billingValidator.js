const { body } = require("express-validator");

exports.validateBilling = [
  body("appointment")
    .notEmpty()
    .isMongoId()
    .withMessage("Valid appointment ID required"),
  body("amount").isNumeric().withMessage("Amount must be a number"),
  body("billingDate")
    .optional()
    .isISO8601()
    .withMessage("Billing date must be valid"),
];
