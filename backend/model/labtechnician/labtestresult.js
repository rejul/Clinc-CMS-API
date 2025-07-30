const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

 //LabTestResultSchema
 
const LabTestResultSchema = new mongoose.Schema({
  labResultId: { type: Number, unique: true },
  labPrescId: { type: Number, ref: 'LabTestPrescription' },
  appointmentId: { type: Number, ref: 'Appointment' },
  results: [{ testName: String, result: String }],
  date: { type: Date, default: Date.now }
}, { timestamps: true, autoIndex: true });

LabTestResultSchema.plugin(AutoIncrement, { inc_field: 'labResultId' });
module.exports = mongoose.model('LabTestResult', LabTestResultSchema);