const express = require("express");
const router = express.Router();
const receptionistCtrl = require("../controller/receptionistController");

// ==================== PATIENT ROUTES ====================

// Patient Endpoints
router.post("/patients", receptionistCtrl.createPatient);
router.put("/patients/:patientId", receptionistCtrl.updatePatient);
router.get("/patients/:patientId", receptionistCtrl.getPatientById);
router.get("/patients", receptionistCtrl.listPatients);
router.patch("/patients/:patientId/deactivate", receptionistCtrl.deactivatePatient);

// ==================== APPOINTMENT ROUTES ====================

// Appointment Endpoints
router.post("/appointments", receptionistCtrl.createAppointment);
router.get("/appointments", receptionistCtrl.getAppointmentsByDate);
router.get("/appointments/patient/:patientId", receptionistCtrl.getAppointmentsByPatient);
router.get("/appointments/doctor/:doctorId", receptionistCtrl.getAppointmentsByDoctor);
router.get("/appointments/status", receptionistCtrl.getAppointmentsByStatus);
router.put("/appointments/:appointmentId", receptionistCtrl.updateAppointment);
router.get("/appointments/:appointmentId", receptionistCtrl.getAppointmentById);
router.patch("/appointments/:appointmentId/cancel", receptionistCtrl.cancelAppointment);

// ==================== BILLING ROUTES ====================

// Billing Endpoints
router.post("/billing", receptionistCtrl.createBilling);
router.put("/billing/:appointmentId", receptionistCtrl.updateBilling);
router.get("/billing/:appointmentId", receptionistCtrl.getBillingByAppointment);
router.get("/billing", receptionistCtrl.getBillingsByDateRange);

module.exports = router; 