const dotenv = require('dotenv').config();
const express = require('express');
const cors = require("cors");
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

app.use(
  cors({
    origin: "https://pwa-poc-sso-client.vercel.app",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://pwa-poc-sso-client.vercel.app');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});


app.use('/auth', authRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));
