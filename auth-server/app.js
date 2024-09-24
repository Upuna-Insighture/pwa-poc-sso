const dotenv = require('dotenv').config();
const express = require('express');
const cors = require("cors");
const session = require('cookie-session');
const passport = require('./config/passportConfig');
const authRoutes = require('./routes/authRoutes');

const app = express();


// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // Allow all origins
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   res.header('Access-Control-Allow-Credentials', 'true');
//   next();
// });

app.use(session({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [process.env.COOKIE_KEY],
  sameSite: "None"
}));

app.use(passport.initialize());
app.use(passport.session());

// app.use(cors({
//   origin: "https://pwa-poc-sso-client.vercel.app", // Allow your client origin
//   credentials: true, // Allow credentials (cookies)
//   methods: "GET,POST,PUT,DELETE", // Specify allowed methods
//   allowedHeaders: ["Content-Type", "Accept", "Access-Control-Allow-Credentials"], // Specify allowed headers
// }));

const allowedOrigins = ['http://localhost:3000', 'https://pwa-poc-sso-client.vercel.app'];

app.use(cors({
    credentials: true,
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}));

app.use('/auth', authRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));
