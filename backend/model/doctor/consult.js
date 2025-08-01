const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

//Consultation Schema

const ConsultationSchema = new mongoose.Schema({
  consultationId: { type: Number, unique: true },
  appointmentId: { type: Number, ref: 'Appointment' },
  doctorId: { type: Number, ref: 'Doctor' },
  patientId: { type: Number, ref: 'Patient' },
  prescriptionId:{ type: Number, ref: 'Prescription' },
  consultationDate: { type: Date, default: Date.now },
  notes: String,
  diagnosis: String
}, { 
  timestamps: true, // Automatically manage createdAt and updatedAt fields
  autoIndex: true, // Enable auto-indexing for better performance
  versionKey: false, // Disable __v field
    toJSON: {
      transform: function(doc, ret) { 
      delete ret._id; // Remove _id field in view
      delete ret.__v; // Remove __v field in view
      return ret;
    }
  }
});

ConsultationSchema.plugin(AutoIncrement, { inc_field: 'consultationId' });
module.exports = mongoose.model('Consultation', ConsultationSchema);