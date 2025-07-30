const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

//Consultation Schema

const ConsultationSchema = new mongoose.Schema({
  consultationId: { type: Number, unique: true },
  appointmentId: { type: Number, ref: 'Appointment' },
  doctorId: { type: Number, ref: 'Doctor' },
  notes: String,
  diagnosis: String
}, { timestamps: true, autoIndex: true });

ConsultationSchema.plugin(AutoIncrement, { inc_field: 'consultationId' });
module.exports = mongoose.model('Consultation', ConsultationSchema);