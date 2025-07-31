const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
// Appointment Schema
const AppointmentSchema = new mongoose.Schema({
  appointmentId: { type: Number, unique: true },
  patientId: { type: Number, ref: 'Patient' },
  doctorId: { type: Number, ref: 'Doctor' },
  date: Date,
  time: String,
  status: { type: String, enum: ['Scheduled', 'Completed', 'Cancelled'], default: 'Scheduled' }
}, {
  timestamps: true,
  autoIndex: true,
  versionKey: false, // Disable __v field
  toJSON: {
    transform: function(doc, ret) {
      delete ret._id; // Remove _id field in view
      delete ret.__v; // Remove __v field in view
      return ret;
    }
  }
});

AppointmentSchema.plugin(AutoIncrement, { inc_field: 'appointmentId' });
module.exports = mongoose.model('Appointment', AppointmentSchema);
