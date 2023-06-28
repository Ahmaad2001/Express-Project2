const express = require("express");
const router = express.Router();
const { moviesGet, createMovie } = require("./movies.controllers");
const passport = require("passport");

router.get("/movies", moviesGet);
router.post(
  "/createMovie",
  passport.authenticate("jwt", { session: false }),
  createMovie
);

module.exports = router;
