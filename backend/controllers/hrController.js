const Employee = require("../models/employeeModel");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: ".env" });

const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Failed to get all employee profiles. Server Error:" + err.message });
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
    console.log("req.body._id: "+req.body._id);
    const employee = await Employee.findByIdAndUpdate(
      req.body._id,
      req.body,
      {
        new: true,
      }
    );
    if(!employee){
      return res.status(401).json({message:"Employee not find"});
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
        role:req.employee?.role,
      },
    };
    const token = await jwt.sign(payload, process.env.SECRET, {
      expiresIn: "3h",
    });
    res.status(200).json({ token });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to generate a Registration Token:" + err.message });
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
