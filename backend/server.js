const express = require("express");
const connectDB = require("./db");
const app = express();
const cors = require("cors");
const port = 4000;
const HRRouter = require("./routers/HRRouter");
const employeeRouter = require("./routers/employeeRouter");
connectDB();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/HR", HRRouter);
app.use("/employee", employeeRouter);

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}/\n` +
      "Server api:\n" +
      "\t(get) /employee/signin : sign in for HR and employee \n" +
      "\t(post) user/signup/ : create a user\n" +
      "\t(post) user/signin/ : log in\n" +
      "\t(put) user/ : update user\n" +
      "\t(get) user/cart : get the cart of the user\n" +
      "\t(get) user/password : get one user\n" +
      "\t(get) product/ : get all products\n" +
      "\t(post) product/ : create a product\n" +
      "\t(get) product/:id : get one product\n" +
      "\t(put) product/:id : update one product\n" +
      "\t(delete) product/:id : delete one product"
  );
});