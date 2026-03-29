const User = require('../models/User');
const Notice = require('../models/Notice');
const Complaint = require('../models/Complaint');

const seedDB = async (req, res) => {
  try {
    // Clear the DB to give a fresh slate for E2E tests
    await User.deleteMany({});
    await Notice.deleteMany({});
    await Complaint.deleteMany({});

    // Seed Admin
    const admin = await User.create({
      name: 'Admin Test',
      email: 'admin@test.com',
      password: 'password123',
      flatNumber: 'ADMIN-1',
      role: 'admin'
    });

    // Seed Resident
    const resident = await User.create({
      name: 'Resident Test',
      email: 'resident@test.com',
      password: 'password123',
      flatNumber: 'B-202',
      role: 'resident'
    });

    // Seed Complaint
    await Complaint.create({
      title: 'Leaky Pipe',
      description: 'The pipe under the sink is leaking in B-202.',
      status: 'open',
      user: resident._id
    });

    res.status(200).json({ message: 'Database seeded for E2E tests successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { seedDB };
