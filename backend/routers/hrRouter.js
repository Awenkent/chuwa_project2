const express = require("express");
const router = express.Router();
const {
  getAllEmployees,
  updateAnyProfile,
  sendSignupEmail,
  getRegistrationHistory,
  createEmployee,
  deleteEmployee,
  sendNotification,
} = require("../controllers/hrController");

const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

// for HR
router.get("/allProfiles", authentication, authorization, getAllEmployees);
router.put("/profile", authentication, authorization, updateAnyProfile); //only for test at backend
router.post("/new", authentication, authorization, sendSignupEmail); //
router.get("/registrationHistory", authentication, authorization, getRegistrationHistory); //
router.post("/employee", authentication, authorization, createEmployee); //
router.post("/notification", authentication, authorization, sendNotification); //
router.delete("/employee", authentication, authorization, deleteEmployee); //

module.exports = router;
