const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AuthorizedUser = require("../../models/AuthorizedUser");
require("dotenv").config();

const hashPassword = async (password, next) => {
  try {
    const hashPassword = await bcrypt.hash(password, 10);
    return hashPassword;
  } catch (error) {
    next(error);
  }
};

const generateToken = (user) => {
  const payload = {
    _id: user._id,
    username: user.username,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXP,
  });
  return token;
};

const signin = async (req, res, next) => {
  try {
    const token = generateToken(req.user);
    return res.json({ token });
  } catch (error) {
    next(error);
  }
};

const signup = async (req, res, next) => {
  try {
    const { password } = req.body;
    const hashPass = await hashPassword(password, next);
    req.body.password = hashPass;
    const user = await AuthorizedUser.create(req.body);
    const token = generateToken(user);
    return res.json({ token });
  } catch (error) {
    next(error);
  }
};

module.exports = { signin, signup };
