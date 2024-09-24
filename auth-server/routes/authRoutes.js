const express = require('express');
const passport = require('../config/passportConfig');
const router = express.Router();

// Google Auth Routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => res.redirect(process.env.CLIENT_URL));

// GitHub Auth Routes
router.get('/github', passport.authenticate('github'));
router.get('/github/callback', passport.authenticate('github', { failureRedirect: '/login' }),
  (req, res) => res.redirect(process.env.CLIENT_URL));

// Facebook Auth Routes
router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));
router.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }),
  (req, res) => res.redirect(process.env.CLIENT_URL));

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect(process.env.CLIENT_URL + 'login');
});

router.get("/login/success", (req, res) => { 
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successful",
      user: req.user,
      cookies: req.cookies
    });
    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'None'
    });
  } else {
    res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

module.exports = router;
