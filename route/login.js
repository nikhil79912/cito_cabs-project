

const express = require('express');
const mysql = require('mysql');
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")

const router = express.Router();
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_USER = process.env.DB_USER || 'root';
const DB_PASSWORD = process.env.DB_PASSWORD || 'Nikhil@98';
const DB_NAME = process.env.DB_NAME || 'auth_db';
const JWT_SECRET = process.env.JWT_SECRET || 'mysecret';

const connection = mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
  });

const login=router.post('/login', (req, res) => {
    const { email, password } = req.body;
  
    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
  
    // Query the database for the user with the given email
    const sql = 'SELECT * FROM users WHERE email = ?';
    connection.query(sql, [email], (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: 'Internal server error' });
      }
  
      // If user with the given email is not found
      if (result.length === 0) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }
  
      // Verify the provided password with the hashed password stored in the database
      bcrypt.compare(password, result[0].password, (err, isMatch) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ error: 'Internal server error' });
        }
  
        // If the password is incorrect
        if (!isMatch) {
          return res.status(401).json({ error: 'Invalid email or password' });
        }
  
        // Generate a JWT token for the user
        const payload = {
          userId: result[0].id,
          email: result[0].email,
        };
        const options = { expiresIn: '1h' };
        const secret = JWT_SECRET;
  
        jwt.sign(payload, secret, options, (err, token) => {
          if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Internal server error' });
          }
  
          // Set the JWT token in a cookie
          res.cookie('token', token, { httpOnly: true, maxAge: 3600000 });
  
          // Send the JWT token in the response
          return res.status(200).json({ token });
        });
      });
    });
  });

  module.exports=login