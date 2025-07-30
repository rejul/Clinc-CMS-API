const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);


const LabTestSchema = new mongoose.Schema({
  labTestId: { type: Number, unique: true },
  name: String,
  description: String,
  cost: Number,
  isActive: { type: Boolean, default: true }
}, { timestamps: true, autoIndex: true });

LabTestSchema.plugin(AutoIncrement, { inc_field: 'labTestId' });
module.exports = mongoose.model('LabTest', LabTestSchema);
