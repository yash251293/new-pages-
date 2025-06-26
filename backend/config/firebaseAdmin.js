const admin = require('firebase-admin');
const path = require('path');
const fs = require('fs');

// Option 1: Try to use GOOGLE_APPLICATION_CREDENTIALS environment variable (recommended for production)
// Option 2: Fallback to a local service account key file for development/testing if env var is not set.
// IMPORTANT: Ensure 'firebase-service-account-key.json' is in .gitignore if you use this local file approach.
const serviceAccountPath = process.env.GOOGLE_APPLICATION_CREDENTIALS || path.join(__dirname, 'firebase-service-account-key.json');

let firebaseAdminAuth;

try {
  if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    // If GOOGLE_APPLICATION_CREDENTIALS is set, Firebase Admin SDK will auto-initialize with it.
    // However, explicit initialization is often clearer.
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
    });
    console.log('Firebase Admin SDK initialized using GOOGLE_APPLICATION_CREDENTIALS.');
  } else if (fs.existsSync(serviceAccountPath)) {
    const serviceAccount = require(serviceAccountPath);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
    console.log('Firebase Admin SDK initialized using local service account key file.');
  } else {
    console.error(`Error: Firebase Admin SDK service account key not found at ${serviceAccountPath} and GOOGLE_APPLICATION_CREDENTIALS is not set. Google Sign-In will not work on the backend.`);
    // You might throw an error here or handle it in a way that the app can still run but with Google Auth disabled.
  }
  firebaseAdminAuth = admin.auth();
} catch (error) {
  console.error('Firebase Admin SDK initialization error:', error);
  // Prevent app crash if initialization fails, but log the critical error.
  // Features requiring admin SDK will not work.
}

module.exports = { admin, firebaseAdminAuth }; // Export both admin and specifically admin.auth()