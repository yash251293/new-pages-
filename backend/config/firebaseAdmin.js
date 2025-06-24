console.log("--- CHECKING ENV VARS AT STARTUP ---");
console.log("MY_SPECIAL_BACKEND_TEST_VAR:", process.env.MY_SPECIAL_BACKEND_TEST_VAR);
console.log("NEXT_PUBLIC_FIREBASE_PROJECT_ID:", process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID);
console.log("GOOGLE_APPLICATION_CREDENTIALS:", process.env.GOOGLE_APPLICATION_CREDENTIALS);
const admin = require('firebase-admin');
const firebaseProjectIdFromEnv = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;

try {
  if (!admin.apps.length) {
    const appOptions = { credential: admin.credential.applicationDefault() };
    if (firebaseProjectIdFromEnv) {
      appOptions.projectId = firebaseProjectIdFromEnv;
      console.log(`Firebase Admin SDK: Explicitly using projectId from env: ${firebaseProjectIdFromEnv}`);
    } else {
      console.error('Firebase Admin SDK: CRITICAL - Project ID env var (e.g., NEXT_PUBLIC_FIREBASE_PROJECT_ID) is NOT set!');
    }
    admin.initializeApp(appOptions);
    console.log('Firebase Admin SDK initialized.');
  }
} catch (error) {
  console.error('Firebase Admin SDK initialization failed:', error);
  if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) console.error('Reason: GOOGLE_APPLICATION_CREDENTIALS not set.');
  else console.error('GOOGLE_APPLICATION_CREDENTIALS is set to:', process.env.GOOGLE_APPLICATION_CREDENTIALS);
}
module.exports = admin;