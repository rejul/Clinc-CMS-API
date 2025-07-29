const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const StaffSchema = new mongoose.Schema({
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
  role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role' },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

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
