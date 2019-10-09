'use strict';
const mongoose = require('mongoose');

const config = {
  production: '.env-prod',
  development: '.env-dev',
  test: '.env-test'
}

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};


module.exports = {
  config,
  connectDB
}