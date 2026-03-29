const mongoose = require('mongoose');

const committeeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a member name'],
    },
    role: {
      type: String,
      required: [true, 'Please specify the role (e.g. President)'],
    },
    phone: {
      type: String,
      required: [true, 'Please provide a contact number'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Committee', committeeSchema);
