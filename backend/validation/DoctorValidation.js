const { body, param } = require('express-validator');
const validate = require('./error').runValidations;


// ==================== VALIDATIONS FOR SUBMODULE - CONSULTATION ====================

// Validation for POST/PUT a consultation note
exports.validateConsultation = [
    body('appointmentId').isNumeric().withMessage('Appointment ID is required'),
    body('doctorId').isNumeric().withMessage('Doctor ID is required'),
    body('patientId').isNumeric().withMessage('Patient ID is required'),
    body('notes').isString().withMessage('Notes are required'),
    validate
];


// Validation for getting consultations by patient
exports.validateGetConsultationsByPatient = [
    param('patientId').isNumeric().withMessage('Patient ID is required'),
    validate
];

// Validation for getting consultations by doctor
exports.validateGetConsultationsByDoctor = [
    param('doctorId').isNumeric().withMessage('Doctor ID is required'),
    validate
];



// ===========VALIDATION FOR SUB MODULE - MEDICINE PRESCRIPTION==================

// Validation for creating a medicine prescription
exports.validateCreateMedicinePrescription = [
    body('appointmentId').isNumeric().withMessage('Appointment ID is required'),
    body('doctorId').isNumeric().withMessage('Doctor ID is required'),
    body('patientId').isNumeric().withMessage('Patient ID is required'),
    body('medicines').isArray().withMessage('Medicines must be an array'),
    validate
];

// Validation for updating a medicine prescription
exports.validateUpdateMedicinePrescription = [
    param('prescriptionId').isNumeric().withMessage('Prescription ID is required'),
    body('medicines').optional().isArray().withMessage('Medicines must be an array'),
    validate
];


// ==========VALIDATION FOR SUB MODULE - LABTEST PRESCRIPTION=================///


// Validation for creating a lab test prescription
exports.validateCreateLabTestPrescription = [
    body('appointmentId').isNumeric().withMessage('Appointment ID is required'),
    body('doctorId').isNumeric().withMessage('Doctor ID is required'),
    body('patientId').isNumeric().withMessage('Patient ID is required'),
    body('tests').isArray({ min: 1 }).withMessage('Tests must be a non-empty array'),
    body('tests.*.testId').isNumeric().withMessage('Test ID must be numeric'),
    body('tests.*.name').isString().withMessage('Test name must be a string'),
    validate
];

// Validation for updating a lab test prescription
exports.validateUpdateLabTestPrescription = [
    param('labPrescId').isNumeric().withMessage('Prescription ID is required'),
    body('tests').optional().isArray({ min: 1 }).withMessage('Tests must be a non-empty array'),
    body('tests.*.testId').optional().isNumeric().withMessage('Test ID must be numeric'),
    body('tests.*.name').optional().isString().withMessage('Test name must be a string'),
    validate
];


//====== Validations ---------------


// Validation for getting medicine prescription history by patient
exports.validateGetMedicinePrescriptionHistoryByPatient = [
    param('patientId').isNumeric().withMessage('Patient ID is required'),
    validate
];

// Validation for getting medicine prescription history by doctor
exports.validateGetMedicinePrescriptionHistoryByDoctor = [
    param('doctorId').isNumeric().withMessage('Doctor ID is required'),
    validate
];

// Validation for getting lab test prescriptions by patient
exports.validateGetLabTestPrescriptionsByPatient = [
    param('patientId').isNumeric().withMessage('Patient ID is required'),
    validate
]

//===Consultation History Validations===
