const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const MedicineSchema = new mongoose.Schema({
  medicineId: { type: Number, unique: true },
  name: String,
  manufacturer: String,
  unit: String,
  isActive: { type: Boolean, default: true }
}, { timestamps: true, autoIndex: true });

MedicineSchema.plugin(AutoIncrement, { inc_field: 'medicineId' });
module.exports = mongoose.model('Medicine', MedicineSchema);
