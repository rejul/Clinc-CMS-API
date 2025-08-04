const { body, param } = require('express-validator');
const { runValidations } = require('./error');

// Lab Technician Validations
const labTestValidation = [
  body('name').notEmpty().withMessage('Lab test name is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('cost').isFloat({ min: 0 }).withMessage('Cost must be a non-negative number'),
  runValidations
];

const labTestResultValidation = [
  body('labPrescId').isInt().withMessage('labPrescId must be an integer'),
  body('appointmentId').isInt().withMessage('appointmentId must be an integer'),
  body('results').isArray({ min: 1 }).withMessage('results must be a non-empty array'),
  runValidations
];

// Pharmacist Validations
const medicineValidation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('manufacturer').notEmpty().withMessage('Manufacturer is required'),
  body('unit').notEmpty().withMessage('Unit is required'),
  body('cost').isFloat({ min: 0 }).withMessage('Cost must be a non-negative number'),
  runValidations
];

const inventoryValidation = [
  body('medicineId').isInt().withMessage('medicineId must be an integer'),
  body('quantity').isInt({ min: 0 }).withMessage('Quantity must be a non-negative integer'),
  body('expiryDate').optional().isISO8601().withMessage('expiryDate must be a valid date'),
  runValidations
];

// Doctor Validations
const consultationValidation = [
  body('appointmentId').isNumeric().withMessage('Appointment ID is required'),
  body('doctorId').isNumeric().withMessage('Doctor ID is required'),
  body('patientId').isNumeric().withMessage('Patient ID is required'),
  body('consultationDate')
    .optional()
    .isISO8601()
    .withMessage('Consultation date must be a valid date')
    .custom((value) => {
      const consultationDate = new Date(value);
      const now = new Date();
      
      // Set time to start of day for comparison
      consultationDate.setHours(0, 0, 0, 0);
      now.setHours(0, 0, 0, 0);
      
      if (consultationDate <= now) {
        throw new Error('Consultation date must be in the future');
      }
      return true;
    }),
  body('notes').isString().withMessage('Notes are required'),
  body('diagnosis').optional().isString().withMessage('Diagnosis must be a string'),
  runValidations
];

const createConsultationValidation = [
  body('appointmentId').isNumeric().withMessage('Appointment ID is required'),
  body('doctorId').isNumeric().withMessage('Doctor ID is required'),
  body('patientId').isNumeric().withMessage('Patient ID is required'),
  body('consultationDate')
    .optional()
    .isISO8601()
    .withMessage('Consultation date must be a valid date')
    .custom((value) => {
      const consultationDate = new Date(value);
      const now = new Date();
      
      // Set time to start of day for comparison
      consultationDate.setHours(0, 0, 0, 0);
      now.setHours(0, 0, 0, 0);
      
      if (consultationDate <= now) {
        throw new Error('Consultation date must be in the future');
      }
      return true;
    }),
  body('notes').isString().withMessage('Notes are required'),
  body('diagnosis').optional().isString().withMessage('Diagnosis must be a string'),
  body('prescriptionId').optional().isNumeric().withMessage('Prescription ID must be numeric'),
  runValidations
];

const updateConsultationValidation = [
  body('appointmentId').optional().isNumeric().withMessage('Appointment ID must be numeric'),
  body('doctorId').optional().isNumeric().withMessage('Doctor ID must be numeric'),
  body('patientId').optional().isNumeric().withMessage('Patient ID must be numeric'),
  body('consultationDate')
    .optional()
    .isISO8601()
    .withMessage('Consultation date must be a valid date')
    .custom((value) => {
      const consultationDate = new Date(value);
      const now = new Date();
      
      // Set time to start of day for comparison
      consultationDate.setHours(0, 0, 0, 0);
      now.setHours(0, 0, 0, 0);
      
      if (consultationDate <= now) {
        throw new Error('Consultation date must be in the future');
      }
      return true;
    }),
  body('notes').optional().isString().withMessage('Notes must be a string'),
  body('diagnosis').optional().isString().withMessage('Diagnosis must be a string'),
  body('prescriptionId').optional().isNumeric().withMessage('Prescription ID must be numeric'),
  runValidations
];

const medicinePrescriptionValidation = [
  body('appointmentId').isNumeric().withMessage('Appointment ID is required'),
  body('doctorId').isNumeric().withMessage('Doctor ID is required'),
  body('patientId').isNumeric().withMessage('Patient ID is required'),
  body('medicines').isArray().withMessage('Medicines must be an array'),
  runValidations
];

const labTestPrescriptionValidation = [
  body('appointmentId').isNumeric().withMessage('Appointment ID is required'),
  body('doctorId').isNumeric().withMessage('Doctor ID is required'),
  body('patientId').isNumeric().withMessage('Patient ID is required'),
  body('tests').isArray({ min: 1 }).withMessage('Tests must be a non-empty array'),
  body('tests.*.testId').isNumeric().withMessage('Test ID must be numeric'),
  body('tests.*.name').isString().withMessage('Test name must be a string'),
  runValidations
];

module.exports = {
  // Lab Technician
  labTestValidation,
  labTestResultValidation,
  
  // Pharmacist
  medicineValidation,
  inventoryValidation,
  
  // Doctor
  consultationValidation,
  createConsultationValidation,
  updateConsultationValidation,
  medicinePrescriptionValidation,
  labTestPrescriptionValidation
}; 