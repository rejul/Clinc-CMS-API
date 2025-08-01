
const express = require("express");
const router = express.Router();
const pharmacistController = require("../controller/pharmacistController");
const { medicineValidation, inventoryValidation } = require("../validation/pharmacistValidator");
const { validationResult } = require('express-validator');

// Middleware to handle validation errors
function handleValidationErrors(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}

// Medicine routes
router.post("/medicines", medicineValidation, handleValidationErrors, pharmacistController.addMedicine);
router.get("/medicines", pharmacistController.listMedicines);
router.get("/medicines/:medicineId", pharmacistController.getMedicineById);
router.put("/medicines/:medicineId", medicineValidation, handleValidationErrors, pharmacistController.updateMedicine);
router.patch(
  "/medicines/:medicineId/deactivate",
  pharmacistController.deactivateMedicine
);

// Inventory routes
router.post("/inventory", inventoryValidation, handleValidationErrors, pharmacistController.addInventory);
router.get("/inventory", pharmacistController.listInventory);
router.get(
  "/inventory/:medicineId",
  pharmacistController.getInventoryByMedicine
);
router.put("/inventory/:medicineId", inventoryValidation, handleValidationErrors, pharmacistController.updateInventory);
router.patch("/inventory/:medicineId/flag", pharmacistController.flagLowStock);

module.exports = router;
