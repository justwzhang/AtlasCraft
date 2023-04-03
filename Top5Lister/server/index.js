// THESE ARE NODE APIs WE WISH TO USE
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

// CREATE OUR SERVER
dotenv.config();
const PORT = process.env.PORT || 4000;
const app = express();

// SETUP THE MIDDLEWARE
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [
      'http://64.227.29.95',
      'https://top5lister.onrender.com',
      'http://localhost:3000',
      'https://urchin-app-zt4cv.ondigitalocean.app',
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// SETUP OUR OWN ROUTERS AS MIDDLEWARE
const top5listsRouter = require('./routes/top5lists-router');
app.use('/api', top5listsRouter);

// INITIALIZE OUR DATABASE OBJECT
const db = require('./db');
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// PUT THE SERVER IN LISTENING MODE
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;