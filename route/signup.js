const express = require("express")
const router = express.Router()
const mysql = require('mysql');
const bcrypt=require("bcrypt")
const PORT = process.env.PORT || 3000;
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_USER = process.env.DB_USER || 'root';
const DB_PASSWORD = process.env.DB_PASSWORD || 'Nikhil@98';
const DB_NAME = process.env.DB_NAME || 'auth_db';

const connection = mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
  });
router.post('/signup', async (req, res) => {
    const { name, email, device_token, password } = req.body;
  
    try {
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Insert the user into the database
      const result = await connection.query(
        'INSERT INTO users (name, email, device_token, password) VALUES (?, ?, ?, ?)',
        [name, email, device_token, hashedPassword]
      );
  
      // Send a success message to the client
      res.json({ message: 'User created successfully' });
    } catch (error) {
      console.error('Error inserting user into database:', error);
      res.status(500).json({ message: 'Internal server error' })
    }
  });


  module.exports = router