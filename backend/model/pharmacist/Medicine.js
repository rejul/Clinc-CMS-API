const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

// Medicine Schema

// This schema defines the structure for managing medicines in the clinic management system.
const MedicineSchema = new mongoose.Schema({
  medicineId: { type: Number, unique: true },
  name: String,
  manufacturer: String,
  unit: String,
  isActive: { type: Boolean, default: true }
}, {
  timestamps: true,
  autoIndex: true,
  versionKey: false, // Disable __v field
  _id: false, // hides id field in subdocuments
  toJSON: {
    transform: function(doc, ret) { 
      delete ret._id; // Remove _id field in view
      delete ret.__v; // Remove __v field in view
      return ret;
    }
  }
});

MedicineSchema.plugin(AutoIncrement, { inc_field: 'medicineId' });
module.exports = mongoose.model('Medicine', MedicineSchema);
