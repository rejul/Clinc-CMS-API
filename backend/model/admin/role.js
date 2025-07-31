const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

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

// Add auto-increment plugin for roleId
RoleSchema.plugin(AutoIncrement, { inc_field: 'roleId' });

// Export the Role model
module.exports = mongoose.model('Role', RoleSchema);