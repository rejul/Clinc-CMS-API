const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);


// Billing Schema

const BillingSchema = new mongoose.Schema({
  billingId: { type: Number, unique: true },
  appointmentId: { type: Number, ref: 'Appointment' },
  amount: Number,
  billingDate: { type: Date, default: Date.now }
}, { timestamps: true, autoIndex: true });

BillingSchema.plugin(AutoIncrement, { inc_field: 'billingId' });
module.exports = mongoose.model('Billing', BillingSchema);
