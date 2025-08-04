const { param } = require('express-validator');
const { runValidations } = require('./error');
const { 
  consultationValidation,
  createConsultationValidation,
  updateConsultationValidation,
  medicinePrescriptionValidation, 
  labTestPrescriptionValidation 
} = require('./simplifiedValidators');

// Validation for getting consultations by patient
exports.validateGetConsultationsByPatient = [
  param('patientId').isNumeric().withMessage('Patient ID is required'),
  runValidations
];

// Validation for getting consultations by doctor
exports.validateGetConsultationsByDoctor = [
  param('doctorId').isNumeric().withMessage('Doctor ID is required'),
  runValidations
];

// Validation for updating a medicine prescription
exports.validateUpdateMedicinePrescription = [
  param('prescriptionId').isNumeric().withMessage('Prescription ID is required'),
  runValidations
];

// Validation for updating a lab test prescription
exports.validateUpdateLabTestPrescription = [
  param('labPrescId').isNumeric().withMessage('Prescription ID is required'),
  runValidations
];

// Validation for getting medicine prescription history by patient
exports.validateGetMedicinePrescriptionHistoryByPatient = [
  param('patientId').isNumeric().withMessage('Patient ID is required'),
  runValidations
];

// Validation for getting medicine prescription history by doctor
exports.validateGetMedicinePrescriptionHistoryByDoctor = [
  param('doctorId').isNumeric().withMessage('Doctor ID is required'),
  runValidations
];

// Validation for getting lab test prescriptions by patient
exports.validateGetLabTestPrescriptionsByPatient = [
  param('patientId').isNumeric().withMessage('Patient ID is required'),
  runValidations
];

// Export the simplified validations
exports.validateConsultation = consultationValidation;
exports.validateCreateConsultation = createConsultationValidation;
exports.validateUpdateConsultation = updateConsultationValidation;
exports.validateCreateMedicinePrescription = medicinePrescriptionValidation;
exports.validateCreateLabTestPrescription = labTestPrescriptionValidation;
