// Labtechnician validation middleware using express-validator
const { body } = require("express-validator");

exports.labTestValidation = [
  body("name").notEmpty().withMessage("Lab test name is required"),
  body("description").notEmpty().withMessage("Description is required"),
  body("cost")
    .isFloat({ min: 0 })
    .withMessage("Cost must be a non-negative number"),
];

exports.labTestResultValidation = [
  body("labPrescId").isInt().withMessage("labPrescId must be an integer"),
  body("appointmentId").isInt().withMessage("appointmentId must be an integer"),
  body("results")
    .isArray({ min: 1 })
    .withMessage("results must be a non-empty array"),
];
