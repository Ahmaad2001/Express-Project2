const errorHandler = (err, req, res, next) => {
  return res
    .status(err.status || 500)
    .json({ message: err.message || "something went wrong" });
};

module.exports = errorHandler;
