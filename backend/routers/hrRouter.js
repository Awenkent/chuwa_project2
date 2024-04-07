const express = require("express");
const router = express.Router();
const {
  getAllEmployees,
  updateAnyProfile,
  getNewEmployeeToken,
  getRegistrationHistory,
  createEmployee,
  deleteEmployee,
} = require("../controllers/hrController");

const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

// for HR
router.get("/allProfiles", authentication, authorization, getAllEmployees);
router.put("/profile", authentication, authorization, updateAnyProfile); //only for test at backend
router.get("/new", authentication, authorization, getNewEmployeeToken); //
router.get("/registrationHistory", authentication, authorization, getRegistrationHistory); //
router.post("/employee", authentication, authorization, createEmployee); //
router.delete("/employee", authentication, authorization, deleteEmployee); //

module.exports = router;
