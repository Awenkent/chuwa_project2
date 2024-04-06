const mongoose = require('mongoose');

// Define the schema for the email history
const registrationHistorySchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  registrationLink: {
    type: String,
    required: true
  },
  submitted: {
    type: Boolean,
    default: false
  }
});

// Create a model using the schema
const RegistrationHistory = mongoose.model('RegistrationHistory', registrationHistorySchema);

module.exports = RegistrationHistory;
