const Movie = require("../../models/Movie");

exports.moviesGet = async (req, res, next) => {
  try {
    const movies = await Movie.find();
    return res.status(201).json(movies);
  } catch (err) {
    return next(err);
  }
};

exports.createMovie = async (req, res, next) => {
  try {
    if (!req.user.isStaff)
      return next({ status: 401, message: "you are not a staff" });
    const newMovie = await Movie.create(req.body);

    res.status(201).json(newMovie);
  } catch (err) {
    return res.status(500).json(err.message);
  }
};
