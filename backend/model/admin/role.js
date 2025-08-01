const mongoose = require('mongoose');

// Role Schema
const RoleSchema = new mongoose.Schema({
  roleId: { type: Number, unique: true },
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
  versionKey: false, // Disable __v field
  toJSON: {
    transform: function(doc, ret) {
      delete ret._id;   // Remove _id field in view
      delete ret.__v;   // Remove __v field in view
      return ret;
    }
  }
});

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
    // Upsert: insert if not exists
    await Role.updateOne(
      { roleId: role.roleId },
      { $setOnInsert: role },
      { upsert: true }
    );
  }
}

Role.insertDefaultRoles = insertDefaultRoles;
// Export the Role model
module.exports = mongoose.model('Role', RoleSchema);
module.exports = Role;