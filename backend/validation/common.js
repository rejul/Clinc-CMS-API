const { body, param, query } = require('express-validator');
const { runValidations } = require('./error');

// Common validation patterns
const commonValidations = {
  // Email validation
  email: body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),

  // Phone validation
  phone: body('phone')
    .optional()
    .trim()
    .matches(/^[\+]?[1-9][\d]{0,15}$/)
    .withMessage('Please provide a valid phone number'),

  // Password validation
  password: body('password')
    .trim()
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),

  // Name validation
  name: (fieldName = 'name') => body(fieldName)
    .trim()
    .notEmpty()
    .withMessage(`${fieldName} is required`)
    .isLength({ min: 2, max: 50 })
    .withMessage(`${fieldName} must be between 2 and 50 characters`),

  // ID parameter validation
  idParam: (paramName = 'id') => param(paramName)
    .isInt({ min: 1 })
    .withMessage(`${paramName} must be a positive integer`),

  // Cost validation
  cost: body('cost')
    .isFloat({ min: 0 })
    .withMessage('Cost must be a non-negative number'),

  // Quantity validation
  quantity: body('quantity')
    .isInt({ min: 0 })
    .withMessage('Quantity must be a non-negative integer'),

  // Date validation
  date: (fieldName = 'date') => body(fieldName)
    .optional()
    .isISO8601()
    .withMessage(`${fieldName} must be a valid date`),

  // Array validation
  array: (fieldName = 'array') => body(fieldName)
    .isArray({ min: 1 })
    .withMessage(`${fieldName} must be a non-empty array`),

  // Gender validation
  gender: body('gender')
    .trim()
    .notEmpty()
    .withMessage('Gender is required')
    .isIn(['Male', 'Female', 'Other'])
    .withMessage('Gender must be Male, Female, or Other'),

  // Date of birth validation
  dob: body('dob')
    .notEmpty()
    .withMessage('Date of birth is required')
    .isISO8601()
    .withMessage('Please provide a valid date of birth')
    .custom((value) => {
      const today = new Date();
      const birthDate = new Date(value);
      const age = today.getFullYear() - birthDate.getFullYear();
      if (age < 0 || age > 120) {
        throw new Error('Invalid date of birth');
      }
      return true;
    })
};

// Common validation chains
const validationChains = {
  // Staff validation
  createStaff: [
    commonValidations.name(),
    commonValidations.email,
    commonValidations.phone,
    commonValidations.password,
    body('roleId')
      .optional()
      .isInt({ min: 1 })
      .withMessage('Role ID must be a positive integer'),
    runValidations
  ],

  updateStaff: [
    commonValidations.idParam('id'),
    commonValidations.name().optional(),
    commonValidations.email.optional(),
    commonValidations.phone,
    commonValidations.password.optional(),
    body('roleId')
      .optional()
      .isInt({ min: 1 })
      .withMessage('Role ID must be a positive integer'),
    runValidations
  ],

  // Patient validation
  createPatient: [
    commonValidations.name('name'),
    commonValidations.email,
    commonValidations.phone,
    commonValidations.gender,
    commonValidations.dob,
    runValidations
  ],

  updatePatient: [
    commonValidations.idParam('patientId'),
    commonValidations.name('name').optional(),
    commonValidations.email.optional(),
    commonValidations.phone,
    commonValidations.gender.optional(),
    commonValidations.dob.optional(),
    runValidations
  ],

  // Medicine validation
  createMedicine: [
    commonValidations.name('name'),
    body('manufacturer').notEmpty().withMessage('Manufacturer is required'),
    body('unit').notEmpty().withMessage('Unit is required'),
    commonValidations.cost,
    runValidations
  ],

  // Lab test validation
  createLabTest: [
    commonValidations.name('name'),
    body('description').notEmpty().withMessage('Description is required'),
    commonValidations.cost,
    runValidations
  ],

  // Inventory validation
  createInventory: [
    body('medicineId').isInt().withMessage('medicineId must be an integer'),
    commonValidations.quantity,
    commonValidations.date('expiryDate'),
    runValidations
  ],

  // Lab test result validation
  createLabTestResult: [
    body('labPrescId').isInt().withMessage('labPrescId must be an integer'),
    body('appointmentId').isInt().withMessage('appointmentId must be an integer'),
    commonValidations.array('results'),
    runValidations
  ]
};

module.exports = {
  commonValidations,
  validationChains
}; 