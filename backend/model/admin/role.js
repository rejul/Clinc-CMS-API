// Role Schema
const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);


const RoleSchema = new mongoose.Schema({
  roleId: { type: Number, unique: true },
  name: {
    type: String,
    enum: ['Admin', 'Doctor', 'Receptionist', 'Lab Technician', 'Pharmacist'],
    required: true
  },
  description: String,
  isActive: { type: Boolean, default: true }
}, { timestamps: true, autoIndex: true });

RoleSchema.plugin(AutoIncrement, { inc_field: 'roleId' });
module.exports = mongoose.model('Role', RoleSchema);