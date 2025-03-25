const Movie = require("../models/movies");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/async");
const path = require("path");
const { uploadImage } = require("../config/cloudinary");

// @desc    Get all movies in the database
// @route   GET /api/v1/movies
// @access  Public
exports.getMovies = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc    Add a new movie to the database
// @route   POST /api/v1/movies
// @access  Private
exports.createMovie = asyncHandler(async (req, res, next) => {
  let posterUrl;
  if (req.file) {
    const file = req.file;
    posterUrl = await uploadImage(file);
  }

  const movie = await Movie.create({
    ...req.body,
    poster: posterUrl
  });

  res.status(201).json({
    success: true, 
    message: "Movie successfully created",
    data: movie
  });
});

// @desc    Get details of a specific movie
// @route   GET /api/v1/movies/:id
// @access  Public
exports.getMovie = asyncHandler(async (req, res, next) => {
  const movie = await Movie.findById(req.params.id);
  if (!movie) {
    return next(new ErrorResponse(`No movie found with the ID: ${req.params.id}`, 404));
  }
  res.status(200).json({
    success: true, 
    message: "Movie details retrieved successfully",
    data: movie
  });
});

// @desc    Update details of a specific movie
// @route   PUT /api/v1/movies/:id
// @access  Private
exports.updateMovie = asyncHandler(async (req, res, next) => {
  let posterUrl;
  const newMovieData = req.body;

  if (req.file) {
    const file = req.file;
    posterUrl = await uploadImage(file);
    newMovieData["poster"] = posterUrl;
  }
  const movie = await Movie.findByIdAndUpdate(req.params.id, newMovieData, {
    new: true,
    runValidators: true
  });
  if (!movie) {
    return next(new ErrorResponse(`No movie found with the ID: ${req.params.id}`, 404));
  }
  res.status(200).json({
    success: true, 
    message: "Movie details updated successfully",
    data: movie
  });
});

// @desc    Remove a movie from the database
// @route   DELETE /api/v1/movies/:id
// @access  Private
exports.deleteMovie = asyncHandler(async (req, res, next) => {
  const movie = await Movie.findByIdAndDelete(req.params.id);
  if (!movie) {
    return next(new ErrorResponse(`No movie found with the ID: ${req.params.id}`, 404));
  }
  res.status(200).json({
    success: true, 
    message: "Movie successfully deleted"
  });
});
