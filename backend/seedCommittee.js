const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Committee = require('./models/Committee');

// Load env vars
dotenv.config();

const seedCommittee = async () => {
  try {
    // 1. Connect to absolute live database
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB Production database...');

    // 2. Erase any existing accidental duplicates for safety
    await Committee.deleteMany();
    console.log('Cleared existing remote Committee data...');

    // 3. Inject the exact old static list dynamically into DB
    const committeeList = [
      { name: 'Sunil Chaudhari', role: 'President', phone: '+91 98765 11111' },
      { name: 'Puneet Agarwal', role: 'Secretary', phone: '+91 98765 22222' },
      { name: 'Rakesh Garg', role: 'Treasurer', phone: '+91 98765 33333' },
      { name: 'Sanjay Negi', role: 'Executive Member', phone: '+91 98765 44444' },
      { name: 'Niru Tyagi', role: 'Executive Member', phone: '+91 98765 44444' },
      { name: 'Pawas Tyagi', role: 'Executive Member', phone: '+91 98765 44444' },
      { name: 'Surbhi Jain', role: 'Executive Member', phone: '+91 98765 44444' },
      { name: 'Ayushi', role: 'Executive Member', phone: '+91 98765 44444' }
    ];

    await Committee.insertMany(committeeList);
    console.log('Successfully Seeded 4 Committee Members into Production!');

    process.exit(0);
  } catch (error) {
    console.error('Population Error:', error);
    process.exit(1);
  }
};

seedCommittee();
