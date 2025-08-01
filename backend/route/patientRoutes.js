const express = require("express");
const router = express.Router();
const patientCtrl = require("../controller/patientController");

// Patient Endpoints
router.post("/", patientCtrl.createPatient);
router.put("/:patientId", patientCtrl.updatePatient);
router.get("/:patientId", patientCtrl.getPatientById);
router.get("/", patientCtrl.listPatients);
router.patch("/:patientId/deactivate", patientCtrl.deactivatePatient);

module.exports = router;
