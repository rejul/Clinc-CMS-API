const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const LabTestPrescriptionSchema = new mongoose.Schema({
  labPrescId: { type: Number, unique: true },
  appointmentId: { type: Number, ref: 'Appointment' },
  doctorId: { type: Number, ref: 'Doctor' },
  patientId: { type: Number, ref: 'Patient' },
  tests: [{ testId: Number, name: String }]
}, { timestamps: true, autoIndex: true });

LabTestPrescriptionSchema.plugin(AutoIncrement, { inc_field: 'labPrescId' });
module.exports = mongoose.model('LabTestPrescription', LabTestPrescriptionSchema);
