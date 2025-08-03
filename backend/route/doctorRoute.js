// backend/route/doctorRoute.js

const express = require('express');
const router = express.Router();
const doctorController = require('../controller/doctorController.js');
const {
    validateConsultation,
    validateCreateMedicinePrescription,
    validateUpdateMedicinePrescription,
    validateCreateLabTestPrescription,
    validateUpdateLabTestPrescription,
    validateGetConsultationsByPatient,
    validateGetConsultationsByDoctor,
    validateGetMedicinePrescriptionHistoryByPatient,
    validateGetMedicinePrescriptionHistoryByDoctor,
    validateGetLabTestPrescriptionsByPatient,
} = require('../validation/DoctorValidation.js');

//======================= Consultation Notes =======================
// Add Consultation Note: POST /api/consultations
router.post('/consultations', validateConsultation, doctorController.addConsultationNote);

// Update Consultation Note: PUT /api/consultations/{consultationId}
router.put('/consultations/:consultationId', validateConsultation, doctorController.updateConsultationNote);

// Get Consultation Note by Appointment ID: GET /api/consultations/appointment/{appointmentId}
router.get('/consultations/appointment/:appointmentId', doctorController.getConsultationByAppointmentId);

// List Consultation Notes by Doctor: GET /api/consultations/doctor/{doctorId}
router.get('/consultations/doctor/:doctorId', doctorController.getConsultationsByDoctor);

//======================= Medicine Prescriptions =======================
// // Create Medicine Prescription: POST /api/prescriptions/medicine
router.post('/prescriptions/medicine', validateCreateMedicinePrescription, doctorController.createMedicinePrescription);

// // Update Medicine Prescription: PUT /api/prescriptions/medicine/{prescriptionId}
router.put('/prescriptions/medicine/:prescriptionId', validateUpdateMedicinePrescription, doctorController.updateMedicinePrescription);

// // // Get Prescription by Appointment ID: GET /api/prescriptions/medicine/appointment/{appointmentId}
router.get('/prescriptions/medicine/appointment/:appointmentId', doctorController.getMedicinePrescriptionByAppointmentId);

// // List Prescriptions by Patient: GET /api/prescriptions/medicine/patient/{patientId}
router.get('/prescriptions/medicine/patient/:patientId', validateGetMedicinePrescriptionHistoryByPatient, doctorController.getMedicinePrescriptionsByPatient);

//======================= Lab Test Prescriptions =======================
// Create Lab Test Prescription: POST /api/prescriptions/labtest
router.post('/prescriptions/labtest', validateCreateLabTestPrescription, doctorController.createLabTestPrescription);

// Update Lab Test Prescription: PUT /api/prescriptions/labtest/{prescriptionId}
router.put('/prescriptions/labtest/:labPrescId', validateUpdateLabTestPrescription, doctorController.updateLabTestPrescription);

// Get Lab Test Prescription by Appointment ID: GET /api/prescriptions/labtest/appointment/{appointmentId}
router.get('/prescriptions/labtest/appointment/:appointmentId', doctorController.getLabTestPrescriptionByAppointmentId);

// List Lab Test Prescriptions by Patient: GET /api/prescriptions/labtest/patient/{patientId}
router.get('/prescriptions/labtest/patient/:patientId', validateGetLabTestPrescriptionsByPatient, doctorController.getLabTestPrescriptionsByPatient);

//======================= Consultation History =======================
// List Consultation History by Patient: GET /api/consultations/patient/{patientId}
router.get('/consultations/patient/:patientId', validateGetConsultationsByPatient, doctorController.getConsultationsByPatient);

// List Consultation History by Doctor: GET /api/consultations/history/doctor/{doctorId}
router.get('/consultations/history/doctor/:doctorId', validateGetConsultationsByDoctor, doctorController.getConsultationHistoryByDoctor);

// Get Consultation History by Appointment ID: GET /api/consultations/history/appointment/{appointmentId}
router.get('/consultations/history/appointment/:appointmentId', doctorController.getConsultationHistoryByAppointmentId);

//======================= Medicine Prescription History =======================
// List Medicine Prescription History by Patient: GET /api/prescriptions/medicine/history/patient/{patientId}
router.get('/prescriptions/medicine/history/patient/:patientId', validateGetMedicinePrescriptionHistoryByPatient, doctorController.getMedicinePrescriptionHistoryByPatient);

// List Medicine Prescription History by Doctor: GET /api/prescriptions/medicine/history/doctor/{doctorId}
router.get('/prescriptions/medicine/history/doctor/:doctorId', validateGetMedicinePrescriptionHistoryByDoctor, doctorController.getMedicinePrescriptionHistoryByDoctor);

// Get Medicine Prescription History by Appointment ID: GET /api/prescriptions/medicine/history/appointment/{appointmentId}
router.get('/prescriptions/medicine/history/appointment/:appointmentId', doctorController.getMedicinePrescriptionHistoryByAppointmentId);

// Export the router
module.exports = router;
