const Employee = require("../models/employeeModel");
const RegistrationHistory = require("../models/registrationHistory");
const jwt = require("jsonwebtoken");
const getOneEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.employee?.id);
    res.status(200).json(employee);
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Error on getting Employee:" + err.message });
  }
};

const verifySignupToken = async (req, res) => {
  const token =
    req.header("x-auth-token") ||
    req.headers?.authorization?.match(/^Bearer (.+)/)[1];

  if (!token) {
    console.log("No token found, user identified as anonymous");
    res.status(400).json({ msg: "No token found" });
  }
  try {
    // Verify token
    const decoded = await jwt.verify(token, process.env.SECRET);
    if (!decoded.HR) {
      console.log("The token is not registration token");
      res.status(400).json({ msg: "The token is not registration token" });
    }

    console.log(decoded);

    res.status(200).json(decoded.email);
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
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
    const history = await RegistrationHistory.updateMany(
      { email: req.body.email },
      { $set: { submitted: true } },
      {
        new: true,
      }
    );
    console.log("History:" + history);
    res.status(201).json(employee);
  } catch (err) {
    console.log(err.message);
    res
      .status(500)
      .json({ message: "Error on creating Employee:" + err.message });
  }
};

const updateEmployee = async (req, res) => {
  try {
    console.log(req.body);
    const employee = await Employee.findByIdAndUpdate(
      req.employee?.id,
      req.body,
      {
        new: true,
      }
    );
    console.log(employee);
    res.status(200).json(employee);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error on updating Employee:" + err.message });
  }
};

module.exports = {
  getOneEmployee,
  createEmployee,
  updateEmployee,
  verifySignupToken,
};
