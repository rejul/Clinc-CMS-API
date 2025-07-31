const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

//Consultation Schema

const ConsultationSchema = new mongoose.Schema({
  consultationId: { type: Number, unique: true },
  appointmentId: { type: Number, ref: 'Appointment' },
  doctorId: { type: Number, ref: 'Doctor' },
  notes: String,
  diagnosis: String
}, { 
  timestamps: true, // Automatically manage createdAt and updatedAt fields
  autoIndex: true, // Enable auto-indexing for better performance
  versionKey: false, // Disable __v field
  // hides id field in subdocuments
    _id: false, // keep _id in subdocuments
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