const express = require("express");
const router = express.Router();
const { signin, signup } = require("./user.controller");
const uploader = require("../../middleswares/uploader");

router.post("/signup", uploader.single("image"), signup);
router.post("/signin", signin);

module.exports = router;
