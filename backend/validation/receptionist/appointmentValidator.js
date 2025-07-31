const { body } = require("express-validator");

exports.validateAppointment = [
  body("patient")
    .notEmpty()
    .isMongoId()
    .withMessage("Valid patient ID required"),
  body("doctor").notEmpty().isMongoId().withMessage("Valid doctor ID required"),
  body("date").isISO8601().withMessage("Date must be valid"),
  body("time").notEmpty().withMessage("Time is required"),
  body("status")
    .optional()
    .isIn(["Scheduled", "Completed", "Cancelled"])
    .withMessage("Invalid status"),
];
