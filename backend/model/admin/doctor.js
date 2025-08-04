const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const DoctorSchema = new mongoose.Schema({
  doctorId: { type: Number, unique: true}, // This is the field being auto-incremented
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

// ✅ Plugin must be added **after** the schema is defined
DoctorSchema.plugin(AutoIncrement, { inc_field: 'doctorId' });

const Doctor = mongoose.model('Doctor', DoctorSchema);

module.exports = {
  Doctor,
  insertSampleDoctors: async () => {
    const doctors = [
      {
        staffId: 1,
        specializationId: 101,
        qualifications: 'MBBS, MD'
      },
      {
        staffId: 2,
        specializationId: 102,
        qualifications: 'MBBS, MS'
      }
    ];

    for (const doc of doctors) {
      const exists = await Doctor.findOne({ staffId: doc.staffId });
      if (!exists) {
        await Doctor.create(doc); 
      }
    }

    console.log('Doctors inserted with auto-incremented doctorId.');
  }
};
