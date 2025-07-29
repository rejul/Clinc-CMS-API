const mongoose = require('mongoose');

//Consultation Schema

const ConsultationSchema = new mongoose.Schema({
  appointment: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
  notes: String,
  diagnosis: String
});

module.exports = mongoose.model('Consult', ConsultationSchema);
