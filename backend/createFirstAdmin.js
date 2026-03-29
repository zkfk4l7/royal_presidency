const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

const createAdmin = async () => {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) throw new Error("No MONGO_URI string detected!");
    
    await mongoose.connect(uri);
    console.log("Connected to MongoDB Atlas.");

    // Check if the generic admin already exists
    const adminExists = await User.findOne({ email: 'admin@royalpresidency.com' });
    
    if (adminExists) {
      console.log("Admin account already exists! Resetting role to 'admin' just in case.");
      adminExists.role = 'admin';
      await adminExists.save();
      console.log("Role ensured: ADMIN. Exit 0.");
      process.exit(0);
    }

    // Create a new master admin
    const adminUser = new User({
      name: "Master Administrator",
      email: "admin@royalpresidency.com",
      password: "RoyalAdmin2026!",
      flatNumber: "Mgmt Office",
      role: "admin"
    });

    await adminUser.save();
    console.log("SUCCESS! Created Administrative Account 'admin@royalpresidency.com'");
    process.exit(0);
  } catch (error) {
    console.error("Critical Failure:", error);
    process.exit(1);
  }
};

createAdmin();
