const { User } = require('../models/user_model');
const jwt = require('jsonwebtoken');

//Sign up user
async function signUp(req, res) {
  try {
    const { firstName, lastName, email, phone, password } = req.body;

    // Validate the email address
    if (!email.includes('@')) {
      return res.status(400).send({ error: 'Invalid email address' });
    }

    if (!firstName || !lastName || !phone || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Validate the password
    if (password.length < 6) {
      return res.status(400).send({ error: 'Password must be at least 6 characters' });
    }

    const user = new User({
      firstName,
      lastName,
      email,
      phone,
      password,
    });
    await user.save();
    const { password: _, ...userWithoutPassword } = user.toObject();
    res.status(201).send({ user: userWithoutPassword });
  } catch (error) {
    res.status(400).send({ error: 'User registration failed', details: error.message });
  }
}

//login user
async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ error: 'Invalid email or password' });
    }
    const isPasswordMatch = await user.checkPassword(password);
    if (!isPasswordMatch) {
      return res.status(400).send({ error: 'Invalid email or password' });
    }
    const token = jwt.sign({ _id: user._id, role: user.role, name: user.firstName }, process.env.JWT_SECRET);
    res.send({ user: { _id: user._id, email: user.email, role: user.role },
         token }); //The frontend will know the user's role to distinguish between Admin and User
  } catch (error) {
    res.status(400).send(error);
  }
}

module.exports = { signUp, login };
