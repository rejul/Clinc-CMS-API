const { body, param } = require('express-validator');
const validate = require('./error').runValidations;

// Validation for adding a consultation note
exports.validateAddConsultationNote = [
    body('appointmentId').isString().withMessage('Appointment ID is required'),
    body('doctorId').isString().withMessage('Doctor ID is required'),
    body('patientId').isString().withMessage('Patient ID is required'),
    body('notes').isString().withMessage('Notes are required'),
];

// Validation for updating a consultation note
exports.validateUpdateConsultationNote = [
    param('consultationId').isString().withMessage('Consultation ID is required'),
    body('notes').optional().isString().withMessage('Notes must be a string'),
];

// Validation for creating a medicine prescription
exports.validateCreateMedicinePrescription = [
    body('appointmentId').isString().withMessage('Appointment ID is required'),
    body('doctorId').isString().withMessage('Doctor ID is required'),
    body('patientId').isString().withMessage('Patient ID is required'),
    body('medicines').isArray().withMessage('Medicines must be an array'),
];

// Validation for updating a medicine prescription
exports.validateUpdateMedicinePrescription = [
    param('prescriptionId').isString().withMessage('Prescription ID is required'),
    body('medicines').optional().isArray().withMessage('Medicines must be an array'),
];

// Validation for creating a lab test prescription
exports.validateCreateLabTestPrescription = [
    body('appointmentId').isString().withMessage('Appointment ID is required'),
    body('doctorId').isString().withMessage('Doctor ID is required'),
    body('patientId').isString().withMessage('Patient ID is required'),
];

// Validation for updating a lab test prescription
exports.validateUpdateLabTestPrescription = [
    param('prescriptionId').isString().withMessage('Prescription ID is required'),
];

// Validation for getting consultations by patient
exports.validateGetConsultationsByPatient = [
    param('patientId').isString().withMessage('Patient ID is required'),
];

// Validation for getting consultations by doctor
exports.validateGetConsultationsByDoctor = [
    param('doctorId').isString().withMessage('Doctor ID is required'),
];

// Validation for getting medicine prescription history by patient
exports.validateGetMedicinePrescriptionHistoryByPatient = [
    param('patientId').isString().withMessage('Patient ID is required'),
];

// Validation for getting medicine prescription history by doctor
exports.validateGetMedicinePrescriptionHistoryByDoctor = [
    param('doctorId').isString().withMessage('Doctor ID is required'),
];

// Validation for getting lab test prescriptions by patient
exports.validateGetLabTestPrescriptionsByPatient = [
    param('patientId').isString().withMessage('Patient ID is required'),
];
