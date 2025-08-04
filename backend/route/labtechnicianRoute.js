const express = require("express");
const router = express.Router();
const controller = require("../controller/labtechnicianController");
const {
  labTestValidation,
  labTestResultValidation,
} = require("../validation/labtechnicianValidator");

// Lab Test Management
router.post(
  "/labtests",
  labTestValidation,
  controller.addLabTest
);
router.put(
  "/labtests/:labTestId",
  labTestValidation,
  controller.updateLabTest
);
router.get("/labtests/:labTestId", controller.getLabTestById);
router.get("/labtests", controller.listLabTests);
router.patch("/labtests/:labTestId/deactivate", controller.deactivateLabTest);

// Lab Test Prescription Management
router.post(
  "/labtests/results",
  labTestResultValidation,
  controller.createLabTestResult
);
router.get("/labtests/results", controller.getLabTestResultsByDate);
router.get(
  "/labtests/results/appointment/:appointmentId",
  controller.getLabTestResultByAppointment
);
router.put(
  "/labtests/results/:labTestPrescriptionId",
  labTestResultValidation,
  controller.recordLabTestResult
);
router.patch(
  "/labtests/:labTestPrescriptionId/deactivate",
  controller.deactivateLabTestPrescription
);

module.exports = router;
