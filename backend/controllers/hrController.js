const Employee = require("../models/employeeModel");
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
    res
      .status(500)
      .json({
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
const getNewEmployeeToken = async (req, res) => {
  try {
    const payload = {
      HR: {
        userName: req.employee?.userName,
        role: req.employee?.role,
      },
    };
    const token = await jwt.sign(payload, process.env.SECRET, {
      expiresIn: "3h",
    });
    const signupLink = `http://localhost:3000/employee/signup/${token}`;
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

    res.status(200).json({ message: "Email sent successfully", signupLink });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to send the sign up email:" + err.message });
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
  getNewEmployeeToken,
  deleteEmployee,
};
