const Employee = require("../models/employeeModel");

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

const updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(
      req.employee?.id,
      req.body,
      {
        new: true,
      }
    );
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
};
