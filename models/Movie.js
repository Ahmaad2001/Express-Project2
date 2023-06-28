const { model, Schema } = require("mongoose");

const MovieSchema = new Schema({
  name: { type: String, unique: true, required: true },
  actors: { type: Schema.Types.ObjectId, ref: "Actor" },
  genre: { type: Schema.Types.ObjectId, ref: "Genre" },
  releaseDate: { type: String, required: true },
});

module.exports = model("Movie", MovieSchema);
