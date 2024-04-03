const express = require("express");
const router = express.Router();
const {
    getAllEmployees,
    updateAnyProfile,
    getNewEmployeeToken,
} = require("../controllers/HRController");

const { doLogin } = require("../controllers/authenticationController");

const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

router.post("/signin", doLogin);


// for HR
router.get("/allEmployees", authentication,authorization, getAllEmployees);
router.put("/AnyProfile/:id", authentication,authorization, updateAnyProfile); //only for test at backend
router.get("/new", authentication,authorization, getNewEmployeeToken); // 


module.exports = router;