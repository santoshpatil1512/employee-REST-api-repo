const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  port: '3308',
  password: '',
  database: 'empdb'
});

async function checkDatabaseConnection() {
  try {
    const connection = await pool.getConnection();
    connection.release(); 
    console.log('Database is connected!');
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
}

checkDatabaseConnection();

module.exports = pool;
