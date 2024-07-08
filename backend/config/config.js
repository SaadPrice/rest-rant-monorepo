require('dotenv').config();

module.exports = {
  "development": {
    "uri": process.env.MONGO_URI || 'mongodb://localhost:27017/rest_rant_dev'
  },
  "test": {
    "uri": process.env.MONGO_URI_TEST || 'mongodb://localhost:27017/rest_rant_test'
  },
  "production": {
    "uri": process.env.MONGO_URI_PROD || 'mongodb://localhost:27017/rest_rant_prod'
  }
};
