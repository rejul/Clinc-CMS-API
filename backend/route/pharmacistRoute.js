
const express = require("express");
const router = express.Router();
const pharmacistController = require("../controller/pharmacistController");
const { medicineValidation, inventoryValidation } = require("../validation/pharmacistValidator");

// Medicine routes
router.post("/medicines", medicineValidation, pharmacistController.addMedicine);
router.get("/medicines", pharmacistController.listMedicines);
router.get("/medicines/:medicineId", pharmacistController.getMedicineById);
router.put("/medicines/:medicineId", medicineValidation, pharmacistController.updateMedicine);
router.patch(
  "/medicines/:medicineId/deactivate",
  pharmacistController.deactivateMedicine
);

// Inventory routes
router.post("/inventory", inventoryValidation, pharmacistController.addInventory);
router.get("/inventory", pharmacistController.listInventory);
router.get(
  "/inventory/:medicineId",
  pharmacistController.getInventoryByMedicine
);
router.put("/inventory/:medicineId", inventoryValidation, pharmacistController.updateInventory);
router.patch("/inventory/:medicineId/flag", pharmacistController.flagLowStock);

module.exports = router;
