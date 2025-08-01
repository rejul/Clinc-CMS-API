const { body, param, validationResult } = require('express-validator');
const validate = require('./error').runValidations;


// ==================== STAFF VALIDATION ====================

// Create Staff Validation
const createStaffValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),
  
  body('phone')
    .optional()
    .trim()
    .matches(/^[\+]?[1-9][\d]{0,15}$/)
    .withMessage('Please provide a valid phone number'),
  
  body('password')
    .trim()
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  
  body('roleId')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Role ID must be a positive integer'),
  
  validate
];

// Update Staff Validation
const updateStaffValidation = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('Staff ID must be a positive integer'),
  
  body('name')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Name cannot be empty')
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  
  body('email')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Email cannot be empty')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),
  
  body('phone')
    .optional()
    .trim()
    .matches(/^[\+]?[1-9][\d]{0,15}$/)
    .withMessage('Please provide a valid phone number'),
  
  body('password')
    .optional()
    .trim()
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  
  body('roleId')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Role ID must be a positive integer'),
  
  validate
];

// Get Staff by ID Validation
const getStaffByIdValidation = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('Staff ID must be a positive integer'),
  
  validate
];

// Delete Staff Validation
const deleteStaffValidation = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('Staff ID must be a positive integer'),
  
  validate
];

// Deactivate Staff Validation
const deactivateStaffValidation = [
  param('staffId')
    .isInt({ min: 1 })
    .withMessage('Staff ID must be a positive integer'),
  
  validate
];

// ==================== LOGIN VALIDATION ====================

// Staff Login Validation
const loginValidation = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),
  
  body('password')
    .trim()
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 1 })
    .withMessage('Password cannot be empty'),
  
  validate
];

// ==================== ROLE VALIDATION ====================

// Create Role Validation
const createRoleValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Role name is required')
    .isIn(['Admin', 'Doctor', 'Receptionist', 'Lab Technician', 'Pharmacist'])
    .withMessage('Role name must be one of: Admin, Doctor, Receptionist, Lab Technician, Pharmacist'),
  
  body('description')
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage('Description must not exceed 200 characters'),
  
  validate
];

// Update Role Validation
const updateRoleValidation = [
  param('roleId')
    .isInt({ min: 1 })
    .withMessage('Role ID must be a positive integer'),
  
  body('name')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Role name cannot be empty')
    .isIn(['Admin', 'Doctor', 'Receptionist', 'Lab Technician', 'Pharmacist'])
    .withMessage('Role name must be one of: Admin, Doctor, Receptionist, Lab Technician, Pharmacist'),
  
  body('description')
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage('Description must not exceed 200 characters'),
  
  validate
];

// Get Role by ID Validation
const getRoleByIdValidation = [
  param('roleId')
    .isInt({ min: 1 })
    .withMessage('Role ID must be a positive integer'),
  
  validate
];

// Deactivate Role Validation
const deactivateRoleValidation = [
  param('roleId')
    .isInt({ min: 1 })
    .withMessage('Role ID must be a positive integer'),
  
  validate
];

// ==================== DOCTOR VALIDATION ====================

// Create Doctor Validation
const createDoctorValidation = [
  body('staffId')
    .isInt({ min: 1 })
    .withMessage('Staff ID must be a positive integer'),
  
  body('specializationId')
    .isInt({ min: 1 })
    .withMessage('Specialization ID must be a positive integer'),
  
  body('qualifications')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Qualifications must not exceed 500 characters'),
  
  validate
];

// Update Doctor Validation
const updateDoctorValidation = [
  param('doctorId')
    .isInt({ min: 1 })
    .withMessage('Doctor ID must be a positive integer'),
  
  body('staffId')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Staff ID must be a positive integer'),
  
  body('specializationId')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Specialization ID must be a positive integer'),
  
  body('qualifications')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Qualifications must not exceed 500 characters'),
  
  validate
];

// Get Doctor by ID Validation
const getDoctorByIdValidation = [
  param('doctorId')
    .isInt({ min: 1 })
    .withMessage('Doctor ID must be a positive integer'),
  
  validate
];

// Deactivate Doctor Validation
const deactivateDoctorValidation = [
  param('doctorId')
    .isInt({ min: 1 })
    .withMessage('Doctor ID must be a positive integer'),
  
  validate
];

// ==================== SPECIALIZATION VALIDATION ====================

// Create Specialization Validation
const createSpecializationValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Specialization name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Specialization name must be between 2 and 100 characters'),
  
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Description must not exceed 500 characters'),
  
  validate
];

// Update Specialization Validation
const updateSpecializationValidation = [
  param('specializationId')
    .isInt({ min: 1 })
    .withMessage('Specialization ID must be a positive integer'),
  
  body('name')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Specialization name cannot be empty')
    .isLength({ min: 2, max: 100 })
    .withMessage('Specialization name must be between 2 and 100 characters'),
  
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage('Description must not exceed 500 characters'),
  
  validate
];

// Get Specialization by ID Validation
const getSpecializationByIdValidation = [
  param('specializationId')
    .isInt({ min: 1 })
    .withMessage('Specialization ID must be a positive integer'),
  
  validate
];

module.exports = {
  // Staff validations
  createStaffValidation,
  updateStaffValidation,
  getStaffByIdValidation,
  deleteStaffValidation,
  deactivateStaffValidation,
  
  // Login validation
  loginValidation,
  
  // Role validations
  createRoleValidation,
  updateRoleValidation,
  getRoleByIdValidation,
  deactivateRoleValidation,
  
  // Doctor validations
  createDoctorValidation,
  updateDoctorValidation,
  getDoctorByIdValidation,
  deactivateDoctorValidation,
  
  // Specialization validations
  createSpecializationValidation,
  updateSpecializationValidation,
  getSpecializationByIdValidation
};
