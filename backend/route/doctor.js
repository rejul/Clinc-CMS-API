//routes

const express = require('express');
const router = express.Router();
const doctorController = require('../controller/doctor.js');
const { route } = require('./receptionist/appointmentRoutes.js');



//Consultation Notes

//Add Consultation Note: POST /api/consultations
router.post('/consultations', doctorController.addConsultationNote);

//Update Consultation Note: PUT /api/consultations/{consultationId}
router.put('/consultations/:consultationId', doctorController.updateConsultationNote);


//Get Consultation Note by Appointment ID: GET /api/consultations/appointment/{appointmentId}
router.get('/consultations/appointment/:appointmentId', doctorController.getConsultationByAppointmentId);

//List Consultation Notes by Doctor: GET /api/consultations/doctor/{doctorId}
router.get('/consultations/doctor/:doctorId', doctorController.getConsultationsByDoctor);



//Medicine Prescriptions

//Create Medicine Prescription: POST /api/prescriptions/medicine
router.post('/prescriptions/medicine', doctorController.createMedicinePrescription);

//Update Medicine Prescription: PUT /api/prescriptions/medicine/{prescriptionId}
router.put('/prescriptions/medicine/:prescriptionId', doctorController.updateMedicinePrescription);

//Get Prescription by Appointment ID: GET /api/prescriptions/medicine/appointment/{appointmentId}
router.get('/prescriptions/medicine/appointment/:appointmentId', doctorController.getMedicinePrescriptionBy)