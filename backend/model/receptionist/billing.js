const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

// Billing Schema
const BillingSchema = new mongoose.Schema({
  billingId: { type: Number, unique: true },
  appointmentId: { type: Number, ref: 'Appointment' },
  amount: Number,
  billingDate: { type: Date, default: Date.now }
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

BillingSchema.plugin(AutoIncrement, { inc_field: 'billingId' });
module.exports = mongoose.model('Billing', BillingSchema);
