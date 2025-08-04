const { body, param, query } = require("express-validator");

// ==================== PATIENT VALIDATION ====================

// Validate patient creation
exports.validateCreatePatient = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Patient name is required")
    .isLength({ min: 2, max: 50 })
    .withMessage("Patient name must be between 2 and 50 characters")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("Patient name can only contain letters and spaces"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please provide a valid email address")
    .normalizeEmail(),

  body("phone")
    .trim()
    .notEmpty()
    .withMessage("Phone number is required")
    .matches(/^[\+]?[1-9][\d]{0,15}$/)
    .withMessage("Please provide a valid phone number"),

  body("gender")
    .trim()
    .notEmpty()
    .withMessage("Gender is required")
    .isIn(["Male", "Female", "Other"])
    .withMessage("Gender must be Male, Female, or Other"),

  body("dob")
    .notEmpty()
    .withMessage("Date of birth is required")
    .isISO8601()
    .withMessage("Please provide a valid date of birth")
    .custom((value) => {
      const today = new Date();
      const birthDate = new Date(value);
      const age = today.getFullYear() - birthDate.getFullYear();
      if (age < 0 || age > 120) {
        throw new Error("Invalid date of birth");
      }
      return true;
    }),
];

// Validate patient update
exports.validateUpdatePatient = [
  param("patientId").isNumeric().withMessage("Patient ID must be a number"),

  body("name")
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("Patient name must be between 2 and 50 characters")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("Patient name can only contain letters and spaces"),

  body("email")
    .optional()
    .trim()
    .isEmail()
    .withMessage("Please provide a valid email address")
    .normalizeEmail(),

  body("phone")
    .optional()
    .trim()
    .matches(/^[\+]?[1-9][\d]{0,15}$/)
    .withMessage("Please provide a valid phone number"),

  body("gender")
    .optional()
    .trim()
    .isIn(["Male", "Female", "Other"])
    .withMessage("Gender must be Male, Female, or Other"),

  body("dob")
    .optional()
    .isISO8601()
    .withMessage("Please provide a valid date of birth")
    .custom((value) => {
      const today = new Date();
      const birthDate = new Date(value);
      const age = today.getFullYear() - birthDate.getFullYear();
      if (age < 0 || age > 120) {
        throw new Error("Invalid date of birth");
      }
      return true;
    }),
];

// Validate patient ID parameter
exports.validatePatientId = [
  param("patientId").isNumeric().withMessage("Patient ID must be a number"),
];

// ==================== APPOINTMENT VALIDATION ====================

// Validate appointment creation
exports.validateCreateAppointment = [
  body("patientId").isNumeric().withMessage("Patient ID must be a number"),

  body("doctorId").isNumeric().withMessage("Doctor ID must be a number"),

  body("date")
    .notEmpty()
    .withMessage("Appointment date is required")
    .isISO8601()
    .withMessage("Please provide a valid appointment date")
    .custom((value) => {
      const appointmentDate = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (appointmentDate < today) {
        throw new Error("Appointment date cannot be in the past");
      }
      return true;
    }),

  body("time")
    .trim()
    .notEmpty()
    .withMessage("Appointment time is required")
    .matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage("Please provide a valid time in HH:MM format"),

  body("status")
    .optional()
    .trim()
    .isIn(["Scheduled", "Completed", "Cancelled"])
    .withMessage("Status must be Scheduled, Completed, or Cancelled"),
];

// Validate appointment update
exports.validateUpdateAppointment = [
  param("appointmentId")
    .isNumeric()
    .withMessage("Appointment ID must be a number"),

  body("patientId")
    .optional()
    .isNumeric()
    .withMessage("Patient ID must be a number"),

  body("doctorId")
    .optional()
    .isNumeric()
    .withMessage("Doctor ID must be a number"),

  body("date")
    .optional()
    .isISO8601()
    .withMessage("Please provide a valid appointment date")
    .custom((value) => {
      const appointmentDate = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (appointmentDate < today) {
        throw new Error("Appointment date cannot be in the past");
      }
      return true;
    }),

  body("time")
    .optional()
    .trim()
    .matches(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage("Please provide a valid time in HH:MM format"),

  body("status")
    .optional()
    .trim()
    .isIn(["Scheduled", "Completed", "Cancelled"])
    .withMessage("Status must be Scheduled, Completed, or Cancelled"),
];

// Validate appointment ID parameter
exports.validateAppointmentId = [
  param("appointmentId")
    .isNumeric()
    .withMessage("Appointment ID must be a number"),
];

// Validate appointment queries
exports.validateAppointmentQueries = [
  query("date")
    .optional()
    .isISO8601()
    .withMessage("Please provide a valid date"),

  query("status")
    .optional()
    .trim()
    .isIn(["Scheduled", "Completed", "Cancelled"])
    .withMessage("Status must be Scheduled, Completed, or Cancelled"),
];

// Validate patient ID for appointments
exports.validatePatientIdForAppointments = [
  param("patientId").isNumeric().withMessage("Patient ID must be a number"),
];

// Validate doctor ID for appointments
exports.validateDoctorIdForAppointments = [
  param("doctorId").isNumeric().withMessage("Doctor ID must be a number"),
];

// ==================== BILLING VALIDATION ====================

// Validate billing creation
exports.validateCreateBilling = [
  body("appointmentId")
    .isNumeric()
    .withMessage("Appointment ID must be a number"),

  body("amount")
    .isFloat({ min: 0 })
    .withMessage("Amount must be a positive number")
    .custom((value) => {
      if (value <= 0) {
        throw new Error("Amount must be greater than 0");
      }
      return true;
    }),

  body("billingDate")
    .optional()
    .isISO8601()
    .withMessage("Please provide a valid billing date"),
];

// Validate billing update
exports.validateUpdateBilling = [
  param("appointmentId")
    .isNumeric()
    .withMessage("Appointment ID must be a number"),

  body("amount")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Amount must be a positive number")
    .custom((value) => {
      if (value <= 0) {
        throw new Error("Amount must be greater than 0");
      }
      return true;
    }),

  body("billingDate")
    .optional()
    .isISO8601()
    .withMessage("Please provide a valid billing date"),
];

// Validate billing queries
exports.validateBillingQueries = [
  query("startDate")
    .optional()
    .isISO8601()
    .withMessage("Please provide a valid start date"),

  query("endDate")
    .optional()
    .isISO8601()
    .withMessage("Please provide a valid end date")
    .custom((value, { req }) => {
      if (
        req.query.startDate &&
        new Date(value) < new Date(req.query.startDate)
      ) {
        throw new Error("End date must be after start date");
      }
      return true;
    }),
];

// Validation is handled by centralized error handling middleware
