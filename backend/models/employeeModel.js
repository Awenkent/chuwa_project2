const mongoose = require("mongoose");

const { Schema } = mongoose;

// Define the schema
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
    firstName: {
      type: String,
      required: true,
      default: "",
    },
    lastName: {
      type: String,
      required: true,
      default: "",
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
      default: "",
      required: true,
    },

    cellPhoneNumber: {
      type: String,
      default: "",
      required: true,
    },
    workPhoneNumber: String,
    SSN: {
      default: "",
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: Date,
      default: Date.now(),
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female", "i do not wish to answer", ""],
      required: true,
      default: "",
    },
    workAuth: {
      type: {
        status: {
          type: String,
          required: true,
          default: "",
        },
        startDate: {
          type: Date,
          required: true,
          default: Date.now(),
        },
        endDate: {
          type: Date,
          default: Date.now(),
          required: true,
        },
      },
    },

    reference: {
      type: {
        firstName: {
          type: String,
          required: true,
          default: "",
        },
        lastName: {
          type: String,
          default: "",
          required: true,
        },
        middleName: String,
        phone: String,
        email: String,
        relationship: {
          type: String,
          default: "",
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
            default: "",
          },
          lastName: {
            type: String,
            default: "",
            required: true,
          },
          middleName: String,
          phone: String,
          email: String,
          relationship: {
            type: String,
            default: "",
            required: true,
          },
        },
      ],
    },
    documents: [{
      id:String,
      filename:String,
      filetype:String,
      fileimage:String,
      datetime:String,
      filesize:String
      
    
    }],
    nextSteps: String,
    feedback: String,
  },
  { collection: "EMPLOYEE" }
);

// Create a model
const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
