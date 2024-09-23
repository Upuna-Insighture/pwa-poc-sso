const dotenv = require('dotenv').config();
const express = require('express');
const cors = require('cors');
const session = require('cookie-session');
const passport = require('./config/passportConfig');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Cookie session setup
app.use(session({
  maxAge: 24 * 60 * 60 * 1000, // 24 hours
  keys: [process.env.COOKIE_KEY], // Secure key for signing the cookie
}));

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// Allowed origins
const allowedOrigins = [
  "http://localhost:3000", // Development
  "https://pwa-poc-sso-client.vercel.app"
  // process.env.CLIENT_URL,  // Production environment from .env
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // Allow cookies to be sent across domains
};

// Use CORS globally - make sure this is placed before routes
app.use(cors(corsOptions));

// Enable CORS for preflight requests
app.options('*', cors(corsOptions));

// Define routes after CORS is enabled
app.use('/auth', authRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
