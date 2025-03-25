const express = require("express");
const {
  getMovies,
  getMovie,
  createMovie,
  updateMovie,
  deleteMovie,
} = require("../controllers/movies");
const Movie = require("../models/movies");
const advancedResults = require("../middlewares/advancedResults");
const router = express.Router();
const multer = require("multer");
const { protectRoute } = require("../middlewares/protectedRoutes");

const storage = multer.memoryStorage();
const upload = multer({storage: storage}).single("poster");

router.route("/")
  .get(advancedResults(Movie), protectRoute, getMovies)
  .post(protectRoute,upload,createMovie);

router.route("/:id")
  .get(protectRoute,getMovie)
  .put(protectRoute,upload,updateMovie)
  .delete(protectRoute,deleteMovie);

module.exports = router;
