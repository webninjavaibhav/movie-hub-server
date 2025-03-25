const ErrorResponse = require("./../utils/errorResponse");
const errorHandler = (err, req, res, next) => {
  let error = {
    ...err
  };

  error.message = err.message;
  //Log to console for dev
  //MOngoose Bad ObjectId
  if (err.name === "CastError") {
    const message = `Movies not found with id of ${err.value}`;
    error = new ErrorResponse(message, 404);
  }
  //Mongoose Duplicate key
  if (err.code === 11000) {
    const message = `Duplicate field value entered for ${Object.keys(err.keyPattern)[0]}`;
    error = new ErrorResponse(message, 400);
  }

  //Mongoose Validation Error
  if (err.name === "ValidationError") {
    const message = Object.values(error.errors).map(val => val.message);
    error = new ErrorResponse(message, 400);
  }
  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Srver Error"
  });
};

module.exports = errorHandler;
