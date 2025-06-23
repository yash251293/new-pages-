const { Pool } = require('pg');
require('dotenv').config({ path: '../.env' }); // Ensure .env from backend root is loaded

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Test the connection (optional, will likely fail in sandbox if pg not installed)
// pool.query('SELECT NOW()', (err, res) => {
//   if (err) {
//     console.error('Error connecting to the database:', err.stack);
//   } else {
//     console.log('Successfully connected to the database. Server time:', res.rows[0].now);
//   }
// });

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool, // Export the pool itself if needed for transactions etc.
};
