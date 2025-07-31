const express = require("express");
const router = express.Router();
const patientCtrl = require("../../controller/receptionist/patientController");
const {
  validatePatient,
} = require("../../validation/receptionist/patientValidator");
const { runValidation } = require("../../validation/receptionist/Validate");

// Patient Endpoints
router.post("/", validatePatient, runValidation, patientCtrl.createPatient);
router.put(
  "/:patientId",
  validatePatient,
  runValidation,
  patientCtrl.updatePatient
);
router.get("/:patientId", patientCtrl.getPatientById);
router.get("/", patientCtrl.listPatients);
router.patch("/:patientId/deactivate", patientCtrl.deactivatePatient);

module.exports = router;
