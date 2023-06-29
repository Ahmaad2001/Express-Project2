const User = require("../models/AuthorizedUser");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = require("passport-jwt").Strategy;
require("dotenv").config();
const { fromAuthHeaderAsBearerToken } = require("passport-jwt").ExtractJwt;

const localStrategy = new LocalStrategy(
  {
    passwordField: "password",
    usernameField: "username",
  },
  async (username, password, done) => {
    try {
      const foundUser = await User.findOne({
        username: username,
      });
      if (!foundUser) return done({ message: "username or password is wrong" });

      const passwordMatch = await bcrypt.compare(password, foundUser.password);
      if (!passwordMatch)
        return done({
          message: "username or password is wrong see this nouf i told you",
        });
      // req.user = foundUser
      done(null, foundUser);
    } catch (error) {
      done(error);
    }
  }
);

const jwtStrategy = new JWTStrategy(
  {
    jwtFromRequest: fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET_KEY,
  },
  async (jwt_payload, done) => {
    try {
      const foundUser = await User.findOne({
        username: jwt_payload.username,
      });
      if (!foundUser) return done(null, false);
      done(null, foundUser);
    } catch (error) {
      done(error);
    }
  }
);

module.exports = { localStrategy, jwtStrategy };
