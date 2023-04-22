const express = require('express');
const mysql = require('mysql');
const bcrypt=require("bcrypt")
const router = express.Router()

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


  const resetPassword=router.post('/reset-password', (req, res) => {
    const { email, newPassword, otp } = req.body;
       
    connection.query('SELECT * FROM reset_tokens WHERE token = ?', otp, (error, results) => {
      if (error) {
        res.status(500).json({
          message: 'Internal server error'
        });
      } else if (results.length === 0) {
        res.status(404).json({
          message: 'invalid otp'
        });
      } else {
    
        bcrypt.hash(newPassword, 10, (err, hash) => {
          if (err) {
            res.status(500).json({
              message: 'Internal server error'
            });
          } else {
           
            connection.query('UPDATE users SET password = ? WHERE email = ?', [hash, email], (error, results) => {
              if (error) {
                res.status(500).json({
                  message: 'Internal server error'
                });
              } else {
                res.status(200).json({
                  message: 'Password updated successfully'
                });
              }
            });
          }
        });
      }
    });
  });

  
  module.exports=resetPassword

