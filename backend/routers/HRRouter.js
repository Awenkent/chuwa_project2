const express = require("express");
const router = express.Router();
const {
    getAllEmployees,
    updateAnyProfile,
    getNewEmployeeToken,
} = require("../controllers/hrController");


const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

// for HR
router.get("/allProfiles", authentication,authorization, getAllEmployees);
router.put("/profile/:id", authentication,authorization, updateAnyProfile); //only for test at backend
router.get("/new", authentication,authorization, getNewEmployeeToken); // 


module.exports = router;