const ErrorResponse = require("./../utils/errorResponse");
const asyncHandler = require("../middlewares/async");
const User = require("../models/user");

// @desc Register User
// @route GET /api/v1/auth/Register
// @access Public
exports.register = asyncHandler(async (req, res, next) => {
  const {name, email, password, role} = req.body;

  //Create user
  const user = await User.create({name, email, password});

  //Create Token
  const token = user.getSignedJwtToken();

  res.status(200).json({
    success: true,
    message: "Registration successful! Welcome to Movie Hub!",
    token: token
  });
});

// @desc Login User
// @route POST /api/v1/auth/Register
// @access Public
exports.login = asyncHandler(async (req, res, next) => {
  const {email, password} = req.body;

  //Validate Email & password
  if (!email || !password) {
    return next(new ErrorResponse("Authentication requires both email and password credentials", 400));
  }

  //Check for user
  const user = await User.findOne({email}).select("+password");

  //check user exist
  if (!user) {
    return next(new ErrorResponse("Authentication failed. Please verify your credentials", 401));
  }

  //Check if password matches
  const isMatch = await user.matchPassword(password);

  //check is password matched
  if (!isMatch) {
    return next(new ErrorResponse("Authentication failed. Please verify your credentials", 401));
  }

  //Create Token
  const token = user.getSignedJwtToken();

  res.status(200).json({
    success: true, 
    message: "Login successful! Welcome back!",
    token: token
  });
});
