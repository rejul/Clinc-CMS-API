const mongoose = require('mongoose');

// Role Schema
const RoleSchema = new mongoose.Schema({
  roleId: { type: Number, unique: true , required:true},
  name: {
    type: String,
    enum: ['Admin', 'Doctor', 'Receptionist', 'Lab Technician', 'Pharmacist'],
    required: true
  },
  description: String,
  isActive: { type: Boolean, default: true }
}, {
  timestamps: true,
  autoIndex: true,
  versionKey: false,
  toJSON: {
    transform: function(doc, ret) {
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
});

// Create Role model
const Role = mongoose.model('Role', RoleSchema);

// Insert all roles in DB if not present
async function insertDefaultRoles() {
  const defaultRoles = [
    { roleId: 1, name: 'Admin', description: 'Administrator with full access' },
    { roleId: 2, name: 'Doctor', description: 'Doctor with medical privileges' },
    { roleId: 3, name: 'Receptionist', description: 'Receptionist with scheduling privileges' },
    { roleId: 4, name: 'Lab Technician', description: 'Lab Technician with lab access' },
    { roleId: 5, name: 'Pharmacist', description: 'Pharmacist with pharmacy access' }
  ];

  for (const role of defaultRoles) {
    await Role.updateOne(
      { roleId: role.roleId },
      { $setOnInsert: role },
      { upsert: true }
    );
  }
  console.log('Default roles inserted (if not already present).');
}

// Export both Role model and insertDefaultRoles
module.exports = {
  Role,
  insertDefaultRoles
};
