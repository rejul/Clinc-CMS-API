const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

// Lab Test Schema

// This schema defines the structure for managing lab tests in the clinic management system.
const LabTestSchema = new mongoose.Schema({
  labTestId: { type: Number, unique: true },
  name: String,
  description: String,
  cost: Number,
  isActive: { type: Boolean, default: true }
}, {
  timestamps: true,
  autoIndex: true,
  toJSON: {
    transform: function(doc, ret) {
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  },
  versionKey: false, // Disable __v field
  id: false // hides virtual id getter (_id)
});

LabTestSchema.plugin(AutoIncrement, { inc_field: 'labTestId' });
module.exports = mongoose.model('LabTest', LabTestSchema);
