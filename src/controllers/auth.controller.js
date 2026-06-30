const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");

async function register(req, res) {
  const { name, email, phone, password, location, role } = req.body;

  if (role === "admin") {
    return res.status(403).json({
      message: "Unauthorized Access",
    });
  }

  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: "Email already exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password, process.env.SALT_ROUNDS);

    const user = await userModel.create({
      name,
      email,
      phone,
      password: hashedPassword,
      location,
      role,
    });

    const createdUser = user.toObject();
    delete createdUser.password;

    return res.status(201).json({
      message: "User registered successfully",
      user: createdUser,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

async function login(req, res) {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }
    const token = generateToken(user);
    const userResponse = user.toObject();
    delete userResponse.password;

    return res.status(200).json({
      message: "Login successful",
      token,
      user: userResponse,
    });
  } catch (err) {
    res.status(500).json({
      message: "Unable to login",
      error: err.message,
    });
  }
}

async function me(req, res) {}

module.exports = { register, login, me };
