import mysql from 'mysql2';
import dotenv from 'dotenv';

dotenv.config();

// Create MySQL connection
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306,
});

// Connect to the database
connection.connect((err) => {
    if (err) {
        console.error('❌ Error connecting to the database:', err.stack);
        return;
    }
    console.log('✅ Connected to the database as id ' + connection.threadId);
});

export default connection;
