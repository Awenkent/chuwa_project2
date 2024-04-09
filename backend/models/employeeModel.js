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
      default: "",
    },
    lastName: {
      type: String,
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
      type: {
        buildingAptNumber: {
          type: String,
          default: "",
        },
        streetName: {
          type: String,
          default: "",
        },
        city: {
          type: String,
          default: "",
        },
        state: {
          type: String,
          default: "",
        },
        zip: {
          type: String,
          default: "",
        },
      },
    },

    cellPhoneNumber: {
      type: String,
      default: "",
    },
    workPhoneNumber: String,
    SSN: {
      default: "",
      type: String,
    },
    dateOfBirth: {
      type: String,
      required: true,
      default: "",
    },
    gender: {
      type: String,
      enum: ["male", "female", "i do not wish to answer", ""],
      default: "",
    },
    optStage:
    {
      type: String,
      enum: ["NONE","RECEIPT", "EAD", "I-983", "I-20"],
      default: "",
    },
    optStatus:
    {
      type: String,
      enum: ["Never submitted", "Pending", "Approved", "Rejected"],
      required: true,
    },
    workAuth: {
      type: {
        type: String,
        default: "",
      },
        status: {
          type: String,
          default: "",
        },
        startDate: {
          type: String,
          default: "",
        },
        endDate: {
          type: String,
          default: "",
        },
     
    },

    reference: {
      type: {
        firstName: {
          type: String,
          default: "",
        },
        lastName: {
          type: String,
          default: "",
        },
        middleName: String,
        phone: String,
        email: String,
        relationship: {
          type: String,
          default: "",
        },
      },
    },
    emergencyContacts: {
      type: [
        {
          firstName: {
            type: String,
            default: "",
          },
          lastName: {
            type: String,
            default: "",
          },
          middleName: String,
          phone: String,
          email: String,
          relationship: {
            type: String,
            default: "",
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
      filesize:String,
      status:String,
      
    }],
    nextSteps: String,
    feedback: String,
  },
  { collection: "EMPLOYEE" }
);

// Create a model
const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
