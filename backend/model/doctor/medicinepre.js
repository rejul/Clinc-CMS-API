const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

// Medicine Prescription Schema
const MedicinePrescriptionSchema = new mongoose.Schema({
  prescriptionId: { type: Number, unique: true },
  appointmentId: { type: Number, ref: 'Appointment' },
  doctorId: { type: Number, ref: 'Doctor' },
  patientId: { type: Number, ref: 'Patient' },
  medicines: [{
    name: String,
    dosage: String,
    frequency: String,
    _id: false // hides _id for each medicine subdocument
  }]
}, { 
  timestamps: true, 
  autoIndex: true,
  versionKey: false, // Disable __v field
  id: false, // hides virtual id getter (_id)
  toJSON: {
    transform: function(doc, ret) {
      delete ret._id; // Remove _id field in view
      return ret;
    }
  }
});

MedicinePrescriptionSchema.plugin(AutoIncrement, { inc_field: 'prescriptionId' });
module.exports = mongoose.model('MedicinePrescription', MedicinePrescriptionSchema);
