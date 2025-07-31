const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

// Define Patient Schema
const PatientSchema = new mongoose.Schema({
    patientId: { type: Number, unique: true }, // Auto-incremented patient ID
    name: String, // Patient name
    email: String, // Patient email
    phone: String, // Patient phone number
    gender: String, // Patient gender
    dob: Date, // Date of birth
    isActive: { type: Boolean, default: true } // Active status
}, {
    timestamps: true,
    autoIndex: true,
    versionKey: false, // Disable __v field
    toJSON: {
        transform: function(doc, ret) {
            delete ret._id; // Remove _id field in view
            delete ret.__v; // Remove __v field in view
            return ret;
        }
    }
});

// Add auto-increment plugin for patientId
PatientSchema.plugin(AutoIncrement, { inc_field: 'patientId' });

// Export Patient model
module.exports = mongoose.model('Patient', PatientSchema);
