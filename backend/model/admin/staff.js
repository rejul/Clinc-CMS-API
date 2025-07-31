const StaffSchema = new mongoose.Schema({
  staffId: { type: Number, unique: true },
  name: String,
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: String,
  password: {
    type: String,
    required: true
  },
  roleId: { type: Number, ref: 'Role' },
  isActive: { type: Boolean, default: true }
}, { 
  timestamps: true,
  autoIndex: true,
  versionKey: false, // Disable __v field
  _id: false,        // Hides _id field in subdocuments
  toJSON: { 
    transform: function(doc, ret) {
      delete ret._id;
      delete ret.__v;
      delete ret.password;
      return ret;
    }
  }
});
