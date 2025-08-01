// Pharmacist validation middleware using express-validator
const { body } = require("express-validator");

exports.medicineValidation = [
  body("name").notEmpty().withMessage("Name is required"),
  body("manufacturer").notEmpty().withMessage("Manufacturer is required"),
  body("unit").notEmpty().withMessage("Unit is required"),
  body("cost")
    .isFloat({ min: 0 })
    .withMessage("Cost must be a non-negative number"),
];

exports.inventoryValidation = [
  body("medicineId").isInt().withMessage("medicineId must be an integer"),
  body("quantity")
    .isInt({ min: 0 })
    .withMessage("Quantity must be a non-negative integer"),
  body("expiryDate")
    .optional()
    .isISO8601()
    .withMessage("expiryDate must be a valid date"),
];
