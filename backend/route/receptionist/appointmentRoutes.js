const express = require("express");
const router = express.Router();
const appointmentCtrl = require("../../controller/receptionist/appointmentController");
const {
  validateAppointment,
} = require("../../validation/receptionist/appointmentValidator");
const { runValidation } = require("../../validation/receptionist/Validate");

// Appointment Endpoints
router.post(
  "/",
  validateAppointment,
  runValidation,
  appointmentCtrl.createAppointment
);
router.get("/", appointmentCtrl.getAppointmentsByDate);
router.get("/patient/:patientId", appointmentCtrl.getAppointmentsByPatient);
router.get("/doctor/:doctorId", appointmentCtrl.getAppointmentsByDoctor);
router.get("/status", appointmentCtrl.getAppointmentsByStatus);
router.put(
  "/:appointmentId",
  validateAppointment,
  runValidation,
  appointmentCtrl.updateAppointment
);
router.get("/:appointmentId", appointmentCtrl.getAppointmentById);
router.patch("/:appointmentId/cancel", appointmentCtrl.cancelAppointment);

module.exports = router;
