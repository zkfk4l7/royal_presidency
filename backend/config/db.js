const mongoose = require('mongoose');
const User = require('../models/User');

const connectDB = async () => {
  try {
    if (process.env.TEST_MODE === 'true') {
      const { MongoMemoryServer } = require('mongodb-memory-server');
      const mongoServer = await MongoMemoryServer.create();
      const testUri = mongoServer.getUri();
      const conn = await mongoose.connect(testUri);
      console.log(`Test Memory MongoDB Connected: ${conn.connection.host}`);
      return;
    }

    const uri = process.env.MONGO_URI;
    if (!uri) {
      console.warn('WARNING: MONGO_URI is not set. Database operations will fail.');
      return;
    }
    const conn = await mongoose.connect(uri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);


    // Seed Admin User locally
    const adminExists = await User.findOne({ role: 'admin' });
    if (!adminExists) {
      const adminParams = {
        name: 'Society Admin',
        email: 'admin@royal.com',
        password: 'admin',
        flatNumber: 'ADMIN-001',
        role: 'admin'
      };
      await User.create(adminParams);
      console.log('Admin user seeded locally');
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
