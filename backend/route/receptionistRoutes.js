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
  handleValidationErrors,
} = require("../validation/receptionistValidator");

// ==================== PATIENT ROUTES ====================

// Patient Endpoints
router.post(
  "/patients",
  validateCreatePatient,
  handleValidationErrors,
  receptionistCtrl.createPatient
);
router.put(
  "/patients/:patientId",
  validateUpdatePatient,
  handleValidationErrors,
  receptionistCtrl.updatePatient
);
router.get(
  "/patients/:patientId",
  validatePatientId,
  handleValidationErrors,
  receptionistCtrl.getPatientById
);
router.get("/patients", receptionistCtrl.listPatients);
router.patch(
  "/patients/:patientId/deactivate",
  validatePatientId,
  handleValidationErrors,
  receptionistCtrl.deactivatePatient
);

// ==================== APPOINTMENT ROUTES ====================

// Appointment Endpoints
router.post(
  "/appointments",
  validateCreateAppointment,
  handleValidationErrors,
  receptionistCtrl.createAppointment
);
router.get(
  "/appointments",
  validateAppointmentQueries,
  handleValidationErrors,
  receptionistCtrl.getAppointmentsByDate
);
router.get(
  "/appointments/patient/:patientId",
  validatePatientIdForAppointments,
  handleValidationErrors,
  receptionistCtrl.getAppointmentsByPatient
);
router.get(
  "/appointments/doctor/:doctorId",
  validateDoctorIdForAppointments,
  handleValidationErrors,
  receptionistCtrl.getAppointmentsByDoctor
);
router.get(
  "/appointments/status",
  validateAppointmentQueries,
  handleValidationErrors,
  receptionistCtrl.getAppointmentsByStatus
);
router.put(
  "/appointments/:appointmentId",
  validateUpdateAppointment,
  handleValidationErrors,
  receptionistCtrl.updateAppointment
);
router.get(
  "/appointments/:appointmentId",
  validateAppointmentId,
  handleValidationErrors,
  receptionistCtrl.getAppointmentById
);
router.patch(
  "/appointments/:appointmentId/cancel",
  validateAppointmentId,
  handleValidationErrors,
  receptionistCtrl.cancelAppointment
);

// ==================== BILLING ROUTES ====================

// Billing Endpoints
router.post(
  "/billing",
  validateCreateBilling,
  handleValidationErrors,
  receptionistCtrl.createBilling
);
router.put(
  "/billing/:appointmentId",
  validateUpdateBilling,
  handleValidationErrors,
  receptionistCtrl.updateBilling
);
router.get(
  "/billing/:appointmentId",
  validateAppointmentId,
  handleValidationErrors,
  receptionistCtrl.getBillingByAppointment
);
router.get(
  "/billing",
  validateBillingQueries,
  handleValidationErrors,
  receptionistCtrl.getBillingsByDateRange
);

module.exports = router;
