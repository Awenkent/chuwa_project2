const Employee = require("../models/employeeModel");
const RegistrationHistory = require("../models/registrationHistory");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: ".env" });
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      message:
        "Failed to get all employee profiles. Server Error:" + err.message,
    });
  }
};

const createEmployee = async (req, res) => {
  try {
    const employee = new Employee(req.body);

    if (!employee.userName || !employee.password) {
      return res
        .status(400)
        .json({ message: "Bad Request: missing parameters" });
    }
    await employee.save();
    res.status(201).json(employee);
  } catch (err) {
    console.log(err.message);
    res
      .status(500)
      .json({ message: "Error on creating Employee:" + err.message });
  }
};

const updateAnyProfile = async (req, res) => {
  try {
    console.log("req.body._id: " + req.body._id);
    const employee = await Employee.findByIdAndUpdate(req.body._id, req.body, {
      new: true,
    });
    if (!employee) {
      return res.status(401).json({ message: "Employee not find" });
    }
    res.status(200).json(employee);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error on updating Employee:" + err.message });
  }
};
const sendSignupEmail = async (req, res) => {
  try {
    const payload = {
      HR: {
        userName: req.employee?.userName,
        role: req.employee?.role,
      },
      email:req.body.email,
    };
    const token = await jwt.sign(payload, process.env.SECRET, {
      expiresIn: "3h",
    });
    const signupLink = `http://localhost:3000/signup/${token}`;
    // Email content
    const mailOptions = {
      from: "weizhouwen5@gmail.com",
      to: req.body.email, // Email address from the request body
      subject: req.body.name + ", Sign up for application",
      text: `Hello ${req.body.name},\n\nPlease sign up using the following link:\n\n${signupLink}`,
    };
    //Send the email
    await sgMail
      .send(mailOptions)
      .then(() => {
        console.log("Email sent");
      })
      .catch((error) => {
        console.error(error);
      });

    const record = {
      email: req.body.email,
      name: req.body.name,
      registrationLink: signupLink,
      submitted: false,
      time:new Date(),
    };
    const registrationInstance = new RegistrationHistory(record);
    await registrationInstance
      .save()
      .then((savedRecord) => {
        console.log("Record saved successfully:", savedRecord);
        // You can handle further operations here if needed
      })
      .catch((error) => {
        console.error("Error saving record:", error);
        // Handle error appropriately
      });
    res.status(200).json({ message: "Email sent successfully", record });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to send the sign up email:" + err.message });
  }
};

const sendNotification = async (req, res) => {
  try {
    
    // Email content
    const mailOptions = {
      from: "weizhouwen5@gmail.com",
      to: req.body.email, // Email address from the request body
      subject: req.body.name + ", Notification from HR",
      text: `Hello ${req.body.name},\n\nPlease continue your application. The next step is:\n\n${req.body.nextSteps}\n\nPlease visit http://localhost:3000/signin to continue your application.`,
    };
    //Send the email
    await sgMail
      .send(mailOptions)
      .then(() => {
        console.log("Email sent");
      })
      .catch((error) => {
        console.error(error);
      });
    res.status(200).json({ message: "Notification Email sent successfully"});
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to send the notification email:" + err.message });
  }
};

const getRegistrationHistory = async (req, res) => {
  try {
    const registrationHistory = await RegistrationHistory.find();
    res.status(200).json(registrationHistory);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({
      message:
        "Failed to get all registration history. Server Error:" + err.message,
    });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.body._id);
    res.status(200).json({ message: "Employee deleted" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error on deleting Employee:" + err.message });
  }
};

module.exports = {
  getAllEmployees,
  createEmployee,
  updateAnyProfile,
  sendSignupEmail,
  getRegistrationHistory,
  deleteEmployee,
  sendNotification,
};
