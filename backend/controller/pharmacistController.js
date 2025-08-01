const Medicine = require("../model/pharmacist/Medicine");
const Inventory = require("../model/pharmacist/inventory");

// Medicine Controllers
exports.addMedicine = async (req, res) => {
  try {
    const medicine = await Medicine.create(req.body);
    res.status(201).json(medicine);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateMedicine = async (req, res) => {
  try {
    const updated = await Medicine.findOneAndUpdate(
      { medicineId: req.params.medicineId },
      req.body,
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ error: "Medicine not found" });
    }
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getMedicineById = async (req, res) => {
  try {
    const medicine = await Medicine.findOne({
      medicineId: req.params.medicineId,
    });
    res.json(medicine);
  } catch (err) {
    res.status(404).json({ error: "Medicine not found" });
  }
};

exports.listMedicines = async (req, res) => {
  try {
    const medicines = await Medicine.find();
    res.json(medicines);
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve medicines" });
  }
};

exports.deactivateMedicine = async (req, res) => {
  try {
    const medicine = await Medicine.findOneAndUpdate(
      { medicineId: req.params.medicineId },
      { isActive: false },
      { new: true }
    );
    res.json(medicine);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Inventory Controllers
exports.addInventory = async (req, res) => {
  try {
    const inventory = await Inventory.create(req.body);
    res.status(201).json(inventory);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateInventory = async (req, res) => {
  try {
    const updated = await Inventory.findOneAndUpdate(
      { inventoryId: req.params.medicineId },
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getInventoryByMedicine = async (req, res) => {
  try {
    const inventory = await Inventory.findOne({
      medicineId: req.params.medicineId,
    });
    res.json(inventory);
  } catch (err) {
    res.status(404).json({ error: "Inventory not found" });
  }
};

exports.listInventory = async (req, res) => {
  try {
    const inventory = await Inventory.find();
    res.json(inventory);
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve inventory" });
  }
};

exports.flagLowStock = async (req, res) => {
  try {
    const inventory = await Inventory.findOneAndUpdate(
      { inventoryId: req.params.medicineId },
      { lowStockFlag: true },
      { new: true }
    );
    res.json(inventory);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
