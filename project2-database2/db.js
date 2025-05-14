const sql = require('mssql');

// Create a connection pool using environment variables
const pool = new sql.ConnectionPool({
  user: process.env.DB_USER,            // From .env
  password: process.env.DB_PASSWORD,    // From .env
  server: process.env.DB_SERVER,        // From .env
  database: process.env.DB_NAME,        // From .env
  options: {
    encrypt: true,                      // For Azure SQL Server (if applicable)
    trustServerCertificate: true        // Change to false for production, use for self-signed certs
  }
});

pool.connect()
  .then(() => console.log('Connected to the database successfully'))
  .catch(err => console.error('Database connection failed:', err));

module.exports = { pool };
