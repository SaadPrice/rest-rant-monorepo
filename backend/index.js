require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const config = require('./config/config')[process.env.NODE_ENV || 'development'];

const uri = config.uri;
console.log('Connecting to MongoDB with URI:', uri); // Log the URI
if (!uri) {
  throw new Error('The MONGO_URI environment variable is not set.');
}

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Database connection successful');
}).catch(err => {
  console.error('Database connection error:', err);
});

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Controllers & Routes
app.use('/places', require('./controllers/places'));
app.use('/users', require('./controllers/users'));

// Listen for connections
app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
