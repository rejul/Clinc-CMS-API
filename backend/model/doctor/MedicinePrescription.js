const mongoose = require('mongoose');

// Medicine Prescription Schema
const MedicinePrescriptionSchema = new mongoose.Schema({
  appointment: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
  medicines: [{ name: String, dosage: String, frequency: String }]
});

// Export the model
module.exports = mongoose.model('MedicinePrescription', MedicinePrescriptionSchema);