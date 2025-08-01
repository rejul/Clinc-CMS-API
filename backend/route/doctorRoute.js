const express = require('express');
const router = express.Router();
const doctorController = require('../controller/doctorController.js');

// Consultation Notes
router.post('/consultations', doctorController.addConsultationNote);
router.put('/consultations/:consultationId', doctorController.updateConsultationNote);
router.get('/consultations/appointment/:appointmentId', doctorController.getConsultationByAppointmentId);
router.get('/consultations/doctor/:doctorId', doctorController.getConsultationsByDoctor);

// // Medicine Prescriptions
router.put('/prescriptions/medicine/:prescriptionId', doctorController.updateMedicinePrescription);
router.get('/prescriptions/medicine/appointment/:appointmentId', doctorController.getMedicinePrescriptionByAppointmentId);
router.get('/prescriptions/medicine/patient/:patientId', doctorController.getMedicinePrescriptionHistoryByAppointmentId);

// Lab Test Prescriptions
router.post('/prescriptions/labtest', doctorController.createLabTestPrescription);
router.put('/prescriptions/labtest/:prescriptionId', doctorController.updateLabTestPrescription);
router.get('/prescriptions/labtest/appointment/:appointmentId', doctorController.getLabTestPrescriptionByAppointmentId);
router.get('/prescriptions/labtest/patient/:patientId', doctorController.getLabTestPrescriptionsByPatient);

// Consultation History
router.get('/consultations/patient/:patientId', doctorController.getConsultationsByPatient);
router.get('/consultations/history/doctor/:doctorId', doctorController.getConsultationHistoryByDoctor);
router.get('/consultations/history/appointment/:appointmentId', doctorController.getConsultationHistoryByAppointmentId);

// Medicine Prescription History
router.get('/prescriptions/medicine/history/patient/:patientId', doctorController.getMedicinePrescriptionHistoryByPatient);
router.get('/prescriptions/medicine/history/doctor/:doctorId', doctorController.getMedicinePrescriptionHistoryByDoctor);
router.get('/prescriptions/medicine/history/appointment/:appointmentId', doctorController.getMedicinePrescriptionHistoryByAppointmentId);

// Export the router
module.exports = router;
