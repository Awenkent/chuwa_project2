const express = require("express");
const connectDB = require("./db");
const app = express();
const cors = require("cors");
const port = 3000;
const hrRouter = require("./routers/hrRouter");
const employeeRouter = require("./routers/employeeRouter");
connectDB();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/HR", hrRouter);
app.use("/employee", employeeRouter);

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}/\n` +
      "Server api:\n" +
      "\t(post) /employee/signin : sign in for HR and employee \n" +
      "\t(post) /employee/signup  : create an employee account" +
      "\t(get) /employee/profile : get the profile for current employee\n" +
      "\t(put) /employee/profile : update the profile for current employee\n" +
      "\t(get) /HR/allProfiles : (HR) get all profiles\n" +
      "\t(put) /HR/profile : (HR) update a profile\n" +
      "\t(get) /HR/new : (HR) get a Registration Token for new employee\n" +
      "\t(post) /HR/employee : (HR) create a employee account\n" +
      "\t(delete) /HR/employee : (HR) delete a employee account\n"
  );
});
