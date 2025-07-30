const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const AppointmentSchema = new mongoose.Schema({
  appointmentId: { type: Number, unique: true },
  patientId: { type: Number, ref: 'Patient' },
  doctorId: { type: Number, ref: 'Doctor' },
  date: Date,
  time: String,
  status: { type: String, enum: ['Scheduled', 'Completed', 'Cancelled'], default: 'Scheduled' }
}, { timestamps: true, autoIndex: true });

AppointmentSchema.plugin(AutoIncrement, { inc_field: 'appointmentId' });
module.exports = mongoose.model('Appointment', AppointmentSchema);
