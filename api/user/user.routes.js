const express = require("express");
const router = express.Router();
const { signin, signup, getUsers } = require("./user.controller");
const uploader = require("../../middleswares/uploader");
const passport = require("passport");

router.param("userId", async (req, res, next, ocrId) => {
  try {
    const foundUser = await fetchUser(userId);
    if (!foundUser) return next({ status: 404, message: "User not found" });
    req.user = foundUser;
    return next();
  } catch (err) {
    return next(err);
  }
});

router.post("/signup", uploader.single("image"), signup);
router.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  signin
);
router.get("/users", getUsers);

module.exports = router;
