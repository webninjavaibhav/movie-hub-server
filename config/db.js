const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // Encode the MongoDB URI to handle special characters
    const encodedUri = encodeURI(process.env.MONGO_URI);
    
    const conn = await mongoose.connect(encodedUri, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold);
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
