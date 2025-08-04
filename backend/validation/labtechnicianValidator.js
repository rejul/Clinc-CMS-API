// Labtechnician validation middleware using express-validator
const { labTestValidation, labTestResultValidation } = require('./simplifiedValidators');

module.exports = {
  labTestValidation,
  labTestResultValidation
};
