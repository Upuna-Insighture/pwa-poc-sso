const dotenv = require('dotenv').config();
const express = require('express');
const cors = require('cors');
const session = require('cookie-session');
const passport = require('./config/passportConfig');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(session({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [process.env.COOKIE_KEY],
}));

app.use(passport.initialize());
app.use(passport.session());

const allowedOrigins = [
  "http://localhost:3000",
  process.env.CLIENT_URL,
];

const corsOptions = {
  origin: allowedOrigins,
  credentials: true,  
};

// Enable preflight across the board
app.use(cors(corsOptions));

// Use CORS only for specific routes, if needed
app.use('/auth', authRoutes);

// Start server
app.listen(5000, () => console.log('Server running on port 5000'));
