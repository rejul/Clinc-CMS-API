//route
const express = require('express');
const router = express.Router();

const doctorController = require('../controller/doctor');


// Add Consultation Note
router.post('/consultations', doctorController.addConsultationNote);
