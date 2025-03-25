const mongoose = require("mongoose");
const slugify = require("slugify");

const MovieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide a movie title"],
    unique: [true,"Movie title is already taken"],
    trim: true,
    maxlength: [20, "Movie title cannot exceed 20 characters"],
    minlength: [2, "Movie title must be at least 2 characters long"]
  },
  publishYear: {
    type: Number,
    required: [true, "Please provide the movie's release year"],
    unique: false,
    validate: {
      validator: function(year) {
        return year >= 1888 && year <= new Date().getFullYear() + 5;
      },
      message: props => `${props.value} is not a valid year! Year must be between 1888 and ${new Date().getFullYear() + 5}`
    }
  },
  poster: String,
}, {
  timestamps: true,
});

module.exports = mongoose.model("Movies", MovieSchema);
