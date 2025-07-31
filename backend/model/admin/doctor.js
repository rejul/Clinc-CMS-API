const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const DoctorSchema = new mongoose.Schema({
  doctorId: { type: Number, unique: true },
  staffId: { type: Number, ref: 'Staff' },
  specializationId: { type: Number, ref: 'Specialization' },
  qualifications: String,
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

DoctorSchema.plugin(AutoIncrement, { inc_field: 'doctorId' });
module.exports = mongoose.model('Doctor', DoctorSchema);