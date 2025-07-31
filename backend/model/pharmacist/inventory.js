const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const InventorySchema = new mongoose.Schema(
  {
    inventoryId: { type: Number, unique: true },
    medicineId: { type: Number, ref: "Medicine" },
    quantity: Number,
    expiryDate: Date,
    lowStockFlag: { type: Boolean, default: false },
  },
  { timestamps: true, autoIndex: true, _id: false, versionKey: false }
);

InventorySchema.plugin(AutoIncrement, { inc_field: "inventoryId" });
module.exports = mongoose.model("Inventory", InventorySchema);
