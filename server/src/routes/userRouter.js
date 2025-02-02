const express = require('express');
const { auth, isAdmin } = require('../middleware/authMiddleware');
const { signUp, login } = require('../contollers/UserController');

const router = express.Router();

// Public routes
router.post('/login', login);
router.post('/signup', signUp);

/* TO CHECK THE PROTECTED ROUTER AUTHRIZATION WORKS
// Protected user route
router.get('/profile', auth, (req, res) => {
  res.send({ message: `Welcome, ${req.user.role} ${req.user.name}!` });
});

// Admin-only route
router.get('/admin-dashboard', auth, isAdmin, (req, res) => {
  res.send({ message: 'Welcome to the Admin Dashboard!' });
});
*/
module.exports = router;
