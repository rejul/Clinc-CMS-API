const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const SpecializationSchema = new mongoose.Schema({
  specializationId: { type: Number, unique: true },
  name: String,
  description: String
}, { timestamps: true, autoIndex: true });

SpecializationSchema.plugin(AutoIncrement, { inc_field: 'specializationId' });
module.exports = mongoose.model('Specialization', SpecializationSchema);