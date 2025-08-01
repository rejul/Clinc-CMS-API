const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const AutoIncrement = require('mongoose-sequence')(mongoose);

// Staff Schema
// This schema defines the structure for staff members in the clinic management system.
const StaffSchema = new mongoose.Schema({
  staffId: { type: Number, unique: true },
  name: String,
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: String,
  password: {
    type: String,
    required: true
  },
  roleId: { type: Number, ref: 'Role' }, //1-admin, 2-doctor, 3-receptionist, 4-labtechnician, 5-pharmacist
  isActive: { type: Boolean, default: true }
}, { 
  timestamps: true,  // Automatically manage createdAt and updatedAt fields
  autoIndex: true, // Enable auto-indexing for better performance
  toJSON: { 
    transform: function(doc, ret) {
      // Remove _id, __v, and password from the JSON output
      delete ret._id;
      delete ret.__v;
      delete ret.password;
      return ret;
    }
  }
});

StaffSchema.plugin(AutoIncrement, { inc_field: 'staffId' });

// Hash password before saving
StaffSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare entered password with stored hash
StaffSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('Staff', StaffSchema);
