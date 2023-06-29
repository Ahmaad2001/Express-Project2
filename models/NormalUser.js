const { model, Schema } = require("mongoose");

const NormalUser = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  image: { type: String },
  isStaff: { type: Boolean, default: false },
});

module.exports = model("NormalUser", NormalUser);
