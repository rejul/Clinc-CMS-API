const mongoose = require('mongoose');
const AutoIncrementFactory = require('mongoose-sequence');
const AutoIncrement = AutoIncrementFactory(mongoose.connection);


// Patient Schema

const PatientSchema = new mongoose.Schema({
  patientId: { type: Number, unique: true },
  name: String,
  email: String,
  phone: String,
  gender: String,
  dob: Date,
  isActive: { type: Boolean, default: true }
}, { timestamps: true, autoIndex: true });

PatientSchema.plugin(AutoIncrement, { inc_field: 'patientId' });
module.exports = mongoose.model('Patient', PatientSchema);

