const mongoose = require("mongoose");

const { Schema } = mongoose;

// Define the schema
const otherInfoSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  middleName: String,
  preferredName: String,
  profilePictureLink: {
    type: String,
    default:
      "https://upload.wikimedia.org/wikipedia/commons/a/af/Default_avatar_profile.jpg",
  },
  currentAddress: {
    type: String,
    required: true,
  },

  cellPhoneNumber: {
    type: String,
    required: true,
  },
  workPhoneNumber: String,
  SSN: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    enum: ["male", "female", "i do not wish to answer"],
    required: true,
  },
  workAuth: {
    type: {
      status: {
        type: String,
        required: true,
      },
      startDate: {
        type: Date,
        required: true,
      },
      endDate: {
        type: Date,
        required: true,
      },
    },
    required: true,
  },

  reference: {
    type: {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      middleName: String,
      phone: String,
      email: String,
      relationship: {
        type: String,
        required: true,
      },
    },
  },
  emergencyContacts: {
    type: [
      {
        firstName: {
          type: String,
          required: true,
        },
        lastName: {
          type: String,
          required: true,
        },
        middleName: String,
        phone: String,
        email: String,
        relationship: {
          type: String,
          required: true,
        },
      },
    ],
    required: true,
  },
  documents: [String],
  nextSteps: String,
  feedback: String,
});

const employeeSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["hr", "employee"],
      required: true,
    },
    userName: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    applicationStatus: {
      type: String,
      enum: ["Never submitted", "Pending", "Approved", "Rejected"],
      required: true,
    },
    otherInfo: otherInfoSchema,
  },
  { collection: "EMPLOYEE" }
);

// Create a model
const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
