module.exports = {
  apps: [
    {
      name: 'culturefix-backend',
      script: './backend/index.js',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      // cwd: "/var/www/culturefix/backend/", // Explicitly setting cwd is often safer
      env: {
        NODE_ENV: 'production',
        PORT: 3001, // You have this

        // === DATABASE VARIABLES ===
        DB_HOST: "localhost", // Replace with your actual DB_HOST if different
        DB_PORT: 5432,      // Replace with your actual DB_PORT if different
        DB_USER: "flexbone_user", // Replace with your actual DB_USER
        DB_PASSWORD: "flexbone_password", // REPLACE with actual password
        DB_NAME: "flexbone_db",     // Replace with your actual DB_NAME

        // === JWT VARIABLES ===
        JWT_SECRET: "yCX9wdTYPojHEWD0xqMhHRFWpeRPCsj/Vbi5iPltuhSl5/kkt6g7VLGGJ4DA=", // REPLACE if different
        JWT_EXPIRES_IN: "1h",

        // === FIREBASE ADMIN SDK ===
        // *** REPLACE with the ACTUAL ABSOLUTE PATH to your service account key JSON file ***
        GOOGLE_APPLICATION_CREDENTIALS: "/var/www/culturefix/backend/config/firebase-service-account-key.json" 
      }
    },
    {
      name: 'culturefix-frontend-main',
      script: 'npm',
      args: 'start',
      cwd: './Final UI',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
        NEXT_PUBLIC_API_URL: 'https://100networks.com/api',
        // You can also duplicate your NEXT_PUBLIC_FIREBASE_ variables here 
        // from your frontend's .env.local for consistency if PM2 serves it directly
        NEXT_PUBLIC_FIREBASE_API_KEY: "AIzaSyANXglJFeNYtzId8ApIZG1n4A0HIEgGzB4",
        NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: "networks-a65aa.firebaseapp.com",
        NEXT_PUBLIC_FIREBASE_PROJECT_ID: "networks-a65aa",
        NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: "networks-a65aa.appspot.com",
        NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: "728896396263",
        NEXT_PUBLIC_FIREBASE_APP_ID: "1:728896396263:web:c026a046ca7a959c98bb42",
        NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: "G-HKCSZMCQJ3"
      }
    }
  ]
};