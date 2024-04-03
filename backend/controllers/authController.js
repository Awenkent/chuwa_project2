const Users = require("../models/userModel");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: ".env" });

const doLogin = async (req, res, next) => {
  try {
    const { userName, password } = req.body;

    let user = await Users.findOne({ userName });

    if (!user) {
      return res
        .status(400)
        .json({ messgae: "Invalid Credentials(User does not exist)" });
    }

    if (user.password !== password) {
      return res
        .status(400)
        .json({ messgae: "Invalid Credentials(Passwod incorrect)" });
    }

    const payload = {
      user: {
        id: user._id,
        userName: user.userName,
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
