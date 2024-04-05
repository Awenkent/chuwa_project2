module.exports = async (req, res, next) => {
  if (req.employee.role !== "hr") {
    console.log("Current API is only allowed for HR");
    res.status(401).json({ msg: "Unauthorize use of API" });
  }
  console.log("Authorized HR");
  next();
};
