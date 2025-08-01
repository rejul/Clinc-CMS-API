const express = require("express");
const router = express.Router();
const appointmentCtrl = require("../controller/appointmentController");

// Appointment Endpoints
router.post("/", appointmentCtrl.createAppointment);
router.get("/", appointmentCtrl.getAppointmentsByDate);
router.get("/patient/:patientId", appointmentCtrl.getAppointmentsByPatient);
router.get("/doctor/:doctorId", appointmentCtrl.getAppointmentsByDoctor);
router.get("/status", appointmentCtrl.getAppointmentsByStatus);
router.put("/:appointmentId", appointmentCtrl.updateAppointment);
router.get("/:appointmentId", appointmentCtrl.getAppointmentById);
router.patch("/:appointmentId/cancel", appointmentCtrl.cancelAppointment);

module.exports = router;
