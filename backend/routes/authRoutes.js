const express = require('express');
const passport = require('passport');

const router = express.Router();

// Google OAuth Login Route
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google OAuth Callback Route
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Redirect to frontend after successful login
    res.redirect('http://localhost:3000'); // Update URL to match your frontend
  }
);

router.get('/logout', (req, res) => {
  req.logout(err => {
    if (err) return res.status(500).send('Error logging out');
    res.status(200).send('Logged out successfully'); // Respond with a success message
  });
});

// Current User Route
router.get('/current-user', (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).send('Not authenticated');
  }
});

module.exports = router;
