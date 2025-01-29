const mongoose= require('mongoose')
require('dotenv').config()
const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          });
          console.log('MongoDB connected');
    } catch (err) {
        console.log('Connection Error: ', err)
    }
}

module.exports= {connectDB}