const bcrypt = require("bcrypt");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const hashPassword = async (password, next) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  } catch (error) {
    next(error);
  }
};

const generateToken = (user) => {
  const payload = {
    _id: user._id,
    username: user.username,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_TOKEN_EXP,
  });
  return token;
};

exports.signup = async (req, res, next) => {
  try {
    const { password } = req.body;
    req.body.password = await hashPassword(password);
    const newUser = await User.create(req.body);
    const token = generateToken(newUser);
    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

exports.signin = async (req, res) => {
  try {
    const token = await generateToken(req.body);
    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(201).json(users);
  } catch (err) {
    res.status(500).json("Server Error");
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    if (!req.user.isStaff && !req.user._id.equals(req.foundUser._id))
      return next({ status: 401, message: "u are not a staff" });
    await User.findByIdAndRemove({ _id: req.foundUser._id });
    return res.status(204).end();
  } catch (error) {
    return next({ status: 400, message: error.message });
  }
};
