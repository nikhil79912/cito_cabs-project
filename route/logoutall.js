const express = require('express');
const mysql = require('mysql');
const nodemailer = require('nodemailer');
const router = express.Router()


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


const logoutAll=router.post('/logout-all-devices', (req, res) => {
    const { userId } = req.body;
  
    
    connection.query('DELETE FROM sessions WHERE user_id = ?', userId, (error, results) => {
      if (error) {
        res.status(500).json({
          message: 'Internal server error'
        });
      } else {
        res.status(200).json({
          message: 'Logged out of all devices successfully'
        });
      }
    });
  });
  

  module.exports=logoutAll
  