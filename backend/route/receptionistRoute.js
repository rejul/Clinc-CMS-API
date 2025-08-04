const express = require("express");
const router = express.Router();
const receptionistCtrl = require("../controller/receptionistController");
const {
  validateCreatePatient,
  validateUpdatePatient,
  validatePatientId,
  validateCreateAppointment,
  validateUpdateAppointment,
  validateAppointmentId,
  validateAppointmentQueries,
  validatePatientIdForAppointments,
  validateDoctorIdForAppointments,
  validateCreateBilling,
  validateUpdateBilling,
  validateBillingQueries,
} = require("../validation/receptionistValidator");

// ==================== PATIENT ROUTES ====================

// Patient Endpoints
router.post("/patients", validateCreatePatient, receptionistCtrl.createPatient);
router.put(
  "/patients/:patientId",
  validateUpdatePatient,
  receptionistCtrl.updatePatient
);
router.get(
  "/patients/:patientId",
  validatePatientId,
  receptionistCtrl.getPatientById
);
router.get("/patients", receptionistCtrl.listPatients);
router.patch(
  "/patients/:patientId/deactivate",
  validatePatientId,
  receptionistCtrl.deactivatePatient
);

// ==================== APPOINTMENT ROUTES ====================

// Appointment Endpoints
router.post(
  "/appointments",
  validateCreateAppointment,
  receptionistCtrl.createAppointment
);
router.get(
  "/appointments",
  validateAppointmentQueries,
  receptionistCtrl.getAppointmentsByDate
);
router.get(
  "/appointments/patient/:patientId",
  validatePatientIdForAppointments,
  receptionistCtrl.getAppointmentsByPatient
);
router.get(
  "/appointments/doctor/:doctorId",
  validateDoctorIdForAppointments,
  receptionistCtrl.getAppointmentsByDoctor
);
router.get(
  "/appointments/status",
  validateAppointmentQueries,
  receptionistCtrl.getAppointmentsByStatus
);
router.put(
  "/appointments/:appointmentId",
  validateUpdateAppointment,
  receptionistCtrl.updateAppointment
);
router.get(
  "/appointments/:appointmentId",
  validateAppointmentId,
  receptionistCtrl.getAppointmentById
);
router.patch(
  "/appointments/:appointmentId/cancel",
  validateAppointmentId,
  receptionistCtrl.cancelAppointment
);

// ==================== BILLING ROUTES ====================

// Billing Endpoints
router.post("/billing", validateCreateBilling, receptionistCtrl.createBilling);
router.put(
  "/billing/:appointmentId",
  validateUpdateBilling,
  receptionistCtrl.updateBilling
);
router.get(
  "/billing/:appointmentId",
  validateAppointmentId,
  receptionistCtrl.getBillingByAppointment
);
router.get("/billing/id/:billingId", receptionistCtrl.getBillingById);
router.put(
  "/billing/update-appointment",
  receptionistCtrl.updateBillingAppointmentId
);
router.get(
  "/billing",
  validateBillingQueries,
  receptionistCtrl.getBillingsByDateRange
);

module.exports = router;
