const mongoose = require('mongoose');

const SpecializationSchema = new mongoose.Schema({
  name: String,
  description: String
});

module.exports = mongoose.model('Specialization', SpecializationSchema);
