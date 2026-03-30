const admin = require('firebase-admin');

// Ensure Firebase is initialized natively using default Compute credentials
if (!admin.apps.length) {
  admin.initializeApp({
    storageBucket: 'rp-site-11597.appspot.com',
  });
}

const bucket = admin.storage().bucket();

module.exports = { bucket };
