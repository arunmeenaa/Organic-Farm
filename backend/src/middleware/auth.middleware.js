const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

async function auth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({
      message: "Unauthorized Access",
    });
  }
  if (!authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Invalid Authorization header",
    });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({
        message: "Authentication failed",
      });
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid Token",
    });
  }
}

module.exports = auth;
