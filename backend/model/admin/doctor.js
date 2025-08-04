const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const DoctorSchema = new mongoose.Schema({
  doctorId: { type: Number, unique: true, required: true }, // This is the field being auto-incremented
  staffId: { type: Number, ref: 'Staff', required: true },
  specializationId: { type: Number, ref: 'Specialization', required: true },
  qualifications: { type: String, required: true },
  isActive: { type: Boolean, default: true }
}, {
  timestamps: true,
  autoIndex: true,
  versionKey: false,
  toJSON: {
    transform: function (doc, ret) {
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
});

//Schema plugin for auto-incrementing the doctorId
DoctorSchema.plugin(AutoIncrement, { inc_field: 'doctorId' });

module.exports = mongoose.model('Doctor', DoctorSchema);
