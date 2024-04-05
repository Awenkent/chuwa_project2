const express = require("express");
const router = express.Router();
const {
  createEmployee,
  getOneEmployee,
  updateEmployee,
} = require("../controllers/employeeController");

const { doLogin } = require("../controllers/authenticationController");
const authentication = require("../middleware/authentication");
const  verify  = require("../middleware/verify");

router.post("/signin", doLogin);

// for employee
router.post("/signup",verify, createEmployee);
router.get("/", authentication, getOneEmployee); // get the profile for current employee
router.put("/onboarding", authentication, updateEmployee);
router.put("/personalInfo", authentication, updateEmployee);

module.exports = router;
