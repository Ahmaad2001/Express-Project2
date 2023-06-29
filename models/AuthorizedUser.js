const { model, Schema } = require("mongoose");

const AuthorizedUserSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  image: { type: String },
  isStaff: { type: Boolean, default: true },
});

module.exports = model("AuthorizedUser", AuthorizedUserSchema);
