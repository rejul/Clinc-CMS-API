const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

// Inventory Schema
// This schema defines the structure for managing inventory of medicines in the clinic management system.
const InventorySchema = new mongoose.Schema(
  {
    inventoryId: { type: Number, unique: true },
    medicineId: { type: Number, ref: "Medicine" },
    quantity: Number,
    expiryDate: Date,
    lowStockFlag: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    autoIndex: true,
    versionKey: false, // Disable __v field
    id: false, // hides virtual id getter (_id)
    toJSON: {
      transform: function (doc, ret) {
        delete ret._id; // Remove _id field
        delete ret.__v; // Remove __v field
        return ret;
      },
    },
  }
);

InventorySchema.plugin(AutoIncrement, { inc_field: "inventoryId" });
module.exports = mongoose.model("Inventory", InventorySchema);
