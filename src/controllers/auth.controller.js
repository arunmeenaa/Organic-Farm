const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");

async function register(req, res) {
  const { name, email, phone, password, location, role } = req.body;

  if(role==="admin"){
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


async function login(req, res) {}
async function me(req, res) {}


module.exports = { register, login, me };
