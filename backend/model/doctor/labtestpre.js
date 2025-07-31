const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const LabTestPrescriptionSchema = new mongoose.Schema({
  labPrescId: { type: Number, unique: true },
  appointmentId: { type: Number, ref: 'Appointment' },
  doctorId: { type: Number, ref: 'Doctor' },
  patientId: { type: Number, ref: 'Patient' },
  tests: [{ testId: Number, name: String, _id: false }]
}, { 
  timestamps: true, 
  autoIndex: true,
  versionKey: false,
  toJSON: { 
    virtuals: true,
    transform: function(doc, ret) {
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
});

LabTestPrescriptionSchema.plugin(AutoIncrement, { inc_field: 'labPrescId' });
module.exports = mongoose.model('LabTestPrescription', LabTestPrescriptionSchema);
