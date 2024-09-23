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
  console.log("==========================")
  console.log(req)
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successfull",
      user: req.user,
      //   cookies: req.cookies
    });
  }
  res.header('Access-Control-Allow-Origin', '*');
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

module.exports = router;
