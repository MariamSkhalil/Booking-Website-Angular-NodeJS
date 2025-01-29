const express = require('express');
const { connectDB } = require('./config/database');

const { User } = require("./models/user_model");


const app = express();

//Connect to database
connectDB();

// Start server
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server started on port ${port}`));

module.exports = app;


// Testing creating a USER
const createUser = async () => {
  const user = new User({
    firstName: "John",
    lastName: "Doe",
    phone: "1234567890",
    email: "john@example.com",
    password: "password123",
    role: "user", // Default, even if not specified
  });

  await user.save();
  console.log("User created:", user);
};

// Create an admin
const createAdmin = async () => {
  const admin = new User({
    firstName: "Admin",
    lastName: "User",
    phone: "9876543210",
    email: "admin@example.com",
    password: "adminpassword123",
    role: "admin", // Admin role
  });

  await admin.save();
  console.log("Admin created:", admin);
};

createUser();
createAdmin();
