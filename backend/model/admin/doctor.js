const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
  staff: { type: mongoose.Schema.Types.ObjectId, ref: 'Staff' },
  specialization: { type: mongoose.Schema.Types.ObjectId, ref: 'Specialization' },
  qualifications: String,
  isActive: { type: Boolean, default: true }
});

module.exports = mongoose.model('Doctor', DoctorSchema);
