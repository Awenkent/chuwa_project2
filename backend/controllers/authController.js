const Employees = require("../models/employeeModel");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: ".env" });

const doLogin = async (req, res, next) => {
  try {
    const { userName, password } = req.body;

    let employee = await Employees.findOne({ userName });

    if (!employee) {
      return res
        .status(400)
        .json({ message: "Invalid Credentials(User does not exist)" });
    }

    if (employee.password !== password) {
      return res
        .status(400)
        .json({ message: "Invalid Credentials(Password incorrect)" });
    }

    const payload = {
      employee: {
        id: employee._id,
        userName: employee.userName,
        role:employee.role,
      },
    };

    const token = await jwt.sign(payload, process.env.SECRET, {
      expiresIn: "30d",
    });

    res.json({ token });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  doLogin,
};
