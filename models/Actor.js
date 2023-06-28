const { model, Schema } = require("mongoose");

const ActorSchema = new Schema({
  name: { type: String, required: true },
});

module.exports = model("Actor", ActorSchema);
