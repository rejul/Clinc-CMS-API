const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const DoctorSchema = new mongoose.Schema({
  doctorId: { type: Number, unique: true },
  staffId: { type: Number, ref: 'Staff' },
  specializationId: { type: Number, ref: 'Specialization' },
  qualifications: String,
  isActive: { type: Boolean, default: true }
}, { timestamps: true, autoIndex: true });

DoctorSchema.plugin(AutoIncrement, { inc_field: 'doctorId' });
module.exports = mongoose.model('Doctor', DoctorSchema);