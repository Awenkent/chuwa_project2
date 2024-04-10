const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  // Get token from header
  const token =
    req.header("x-auth-token") ||
    req.headers?.authorization?.match(/^Bearer (.+)/)[1];

  // req.header { authorization: 'Bearer hureuiwe.bhuerer.duwwe' }

  // Check if token exists
  if (!token) {
    console.log("No token found, user identified as anonymous");
    res.status(400).json({ msg: "No token found" });
  }
  try {
    // Verify token
    const decoded = await jwt.verify(token, process.env.SECRET);
    if(!decoded.HR){
        console.log("The token is not registration token");
        res.status(400).json({ msg: "The token is not registration token" });
    } 
    
    console.log(decoded);
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};