const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

// Specialization Schema
const SpecializationSchema = new mongoose.Schema({
  specializationId: { type: Number, unique: true },
  name: String,
  description: String
}, {
  timestamps: true,
  autoIndex: true,
  versionKey: false, // Disable __v field
  toJSON: {
    transform: function (doc, ret) {
      delete ret._id;   // Remove _id field in view
      delete ret.__v;   // Remove __v field in view (for safety)
      return ret;
    }
  }
});

SpecializationSchema.plugin(AutoIncrement, { inc_field: 'specializationId' });

// Export the Specialization model
module.exports = mongoose.model('Specialization', SpecializationSchema);