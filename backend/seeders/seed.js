require('dotenv').config();
const mongoose = require('mongoose');
const config = require('../config/config')[process.env.NODE_ENV || 'development'];

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
  seedDatabase();
}).catch(err => {
  console.error('Database connection error:', err);
  process.exit(1);
});

const Place = require('../models/place');

function seedDatabase() {
  Place.create([{
    name: 'H-Thai-ML',
    city: 'Seattle',
    state: 'WA',
    cuisines: 'Thai, Pan-Asian',
    pic: '/images/h-thai-ml-tables.jpg',
    founded: 1989
  }, {
    name: 'Coding Cat Cafe',
    city: 'Phoenix',
    state: 'AZ',
    cuisines: 'Coffee, Bakery',
    pic: '/images/coffee-cat.jpg',
    founded: 2020
  }]).then(() => {
    console.log('Success!');
    process.exit();
  }).catch(err => {
    console.log('Failure!', err);
    process.exit();
  });
}
