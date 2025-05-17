const userModel = require("../Models/userModel");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  const jwtkey = process.env.JWT_SECRET_KEY;
  return jwt.sign({ _id }, jwtkey, { expiresIn: "3d" });
};

const registerUser = async (req, res) => {
  try {
    const { first_name, last_name, email, phone, password } = req.body;

    let user = await userModel.findOne({ email });

    if (user) return res.status(400).json("User already Exit...");

    if (!first_name || !last_name || !email || !password)
      return res.status(400).json("All fields are required");

    if (!validator.isEmail(email))
      return res.status(400).json("Email must be Valid");

    if (!validator.isStrongPassword(password)) {
      const errorMessage =
        "Password must be Strong.\n" +
        "At least,  Upper case , Lower case ,Number , One special Character , Length will be 8+";
      return res.status(400).json(errorMessage);
    }

    user = new userModel({ first_name, last_name, email, phone, password });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    const token = createToken(user._id);
    console.log("User token:", token);

    res
      .status(200)
      .json({ _id: user._id, first_name, last_name, email, phone, token });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await userModel.findOne({ email });

    if (!user)
      return res.status(400).json("Invalid Email. Please Register First");

    // Check if the password is correct
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json("Invalid password");
    }

    // If email and password are correct, generate JWT token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY);
    console.log("token from login:", token);
    res.status(200).json({
      _id: user._id,
      first_name: user.first_name,
      last_name: user.last_name,
      email,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const findUser = async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await userModel.findById(userId);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = { registerUser, loginUser, findUser, getAllUsers };
