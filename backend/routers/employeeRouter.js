const express = require("express");
const router = express.Router();
const {
  createEmployee,
  getProfile,
  updateProfile,
} = require("../controllers/employeeController");

const { doLogin } = require("../controllers/authenticationController");
const { verify } = require("../controllers/verify");
const authentication = require("../middlewares/authentication");

router.post("/signin", doLogin);

// for employee
router.post("/signup", verify, createEmployee);
router.get("/profile", authentication, getProfile); // get the profile for current employee
router.put("/profile", authentication, updateProfile);



module.exports = router;