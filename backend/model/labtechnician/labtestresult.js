const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

// LabTestResultSchema
// This schema defines the structure for storing lab test results in the clinic management system.
const LabTestResultSchema = new mongoose.Schema({
  labResultId: { type: Number, unique: true },
  labPrescId: { type: Number, ref: 'LabTestPrescription' },
  appointmentId: { type: Number, ref: 'Appointment' },
  results: [{ testName: String, result: String }],
  date: { type: Date, default: Date.now }
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
  versionKey: false // Disable __v field
});

LabTestResultSchema.plugin(AutoIncrement, { inc_field: 'labResultId' });
module.exports = mongoose.model('LabTestResult', LabTestResultSchema);