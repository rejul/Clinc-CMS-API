const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence');

// Base schema with common fields
const createBaseSchema = (options = {}) => {
  const baseFields = {
    isActive: { 
      type: Boolean, 
      default: true 
    }
  };

  // Add auto-increment field if specified
  if (options.autoIncrementField) {
    baseFields[options.autoIncrementField] = { 
      type: Number, 
      unique: true 
    };
  }

  // Add timestamps if specified
  const schemaOptions = {
    timestamps: true,
    autoIndex: true,
    toJSON: {
      transform: function(doc, ret) {
        delete ret.__v;
        if (options.excludePassword) {
          delete ret.password;
        }
        if (options.excludeId) {
          delete ret._id;
        }
        return ret;
      }
    }
  };

  const schema = new mongoose.Schema(baseFields, schemaOptions);

  // Add auto-increment plugin if specified
  if (options.autoIncrementField) {
    schema.plugin(AutoIncrement(mongoose), { 
      inc_field: options.autoIncrementField 
    });
  }

  return schema;
};

module.exports = {
  createBaseSchema
}; 