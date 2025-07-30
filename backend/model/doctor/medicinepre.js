const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
// Medicine Prescription Schema

const MedicinePrescriptionSchema = new mongoose.Schema({
  prescriptionId: { type: Number, unique: true },
  appointmentId: { type: Number, ref: 'Appointment' },
  doctorId: { type: Number, ref: 'Doctor' },
  patientId: { type: Number, ref: 'Patient' },
  medicines: [{ name: String, dosage: String, frequency: String }]
}, { timestamps: true, autoIndex: true });

MedicinePrescriptionSchema.plugin(AutoIncrement, { inc_field: 'prescriptionId' });
module.exports = mongoose.model('MedicinePrescription', MedicinePrescriptionSchema);
