const express = require("express");
const { signin, signup } = require("./normalUser.controllers");
const passport = require("passport");

const router = express.Router();

// routes
// signin
router.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  signin
);
// signup
router.post("/signup", signup);

module.exports = router;
