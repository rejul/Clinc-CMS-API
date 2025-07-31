const { body } = require("express-validator");

exports.validatePatient = [
  body("name").notEmpty().withMessage("Patient name is required"),
  body("email").isEmail().optional().withMessage("Invalid email"),
  body("phone").notEmpty().withMessage("Phone is required"),
  body("gender").notEmpty().withMessage("Gender is required"),
  body("dob").isISO8601().withMessage("Date of birth must be a valid date"),
];
