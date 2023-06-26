const { model, Schema } = require("mongoose");

const UserSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  //   image: { type: String },
  //   isStaff: { type: Boolean },
});

module.exports = model("User", UserSchema);
