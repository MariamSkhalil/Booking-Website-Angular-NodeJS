const mongoose= require('mongoose')
require('dotenv').config()
const connectDB = async () => {
    try {
      await mongoose.connect(process.env.DB_URI, {}); // Remove deprecated options
      console.log('MongoDB Connected...');
    } catch (error) {
      console.error('Connection Error:', error);
      process.exit(1); // Exit if connection fails
    }
  };

module.exports= {connectDB}