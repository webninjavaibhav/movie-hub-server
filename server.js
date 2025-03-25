const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const errorHandler = require("./middlewares/error");
const connectDB = require("./config/db");
const path = require("path");
// const cloudinary = require('cloudinary').v2;
//load env vars
dotenv.config({});

//Connect to badabase
connectDB();

//Route files
const movies = require("./routes/movies");
const auth = require("./routes/auth");
const cors = require("cors");
const app = express();

//Boby Parser
app.use(express.json());



//Dev ogin middlewares
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(cors({

}));

//Mount routes
app.use("/api/v1/movies", movies);
app.use("/api/v1/auth", auth);
app.get("/", (req, res) => {
  res.send("Server is running");
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));

// Handle unhandled promise rejection
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  server.close(() => process.exit(1));
});
