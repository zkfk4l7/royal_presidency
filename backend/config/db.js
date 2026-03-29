const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const User = require('../models/User');

const connectDB = async () => {
  try {
    const mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    
    const conn = await mongoose.connect(uri);
    console.log(`In-Memory MongoDB Connected: ${conn.connection.host}`);

    // Seed Admin User
    const adminExists = await User.findOne({ role: 'admin' });
    if (!adminExists) {
      const adminParams = {
        name: 'Society Admin',
        email: 'admin@royal.com',
        password: 'admin', // will be hashed by pre-save hook
        flatNumber: 'ADMIN-001',
        role: 'admin'
      };
      await User.create(adminParams);
      console.log('Admin user seeded: admin@royal.com / admin');
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
