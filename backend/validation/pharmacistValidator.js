// Pharmacist validation middleware using express-validator
const { medicineValidation, inventoryValidation } = require('./simplifiedValidators');

module.exports = {
  medicineValidation,
  inventoryValidation
};
