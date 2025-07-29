const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema({
  name: {
    type: String,
    enum: ['Admin', 'Pharmacist', 'Receptionist', 'Doctor', 'Lab Technician'],
    required: true,
    unique: true
  },
  description: String,
  isActive: { type: Boolean, default: true }
});

module.exports = mongoose.model('Role', RoleSchema);
