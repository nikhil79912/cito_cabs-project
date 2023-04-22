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


  const logout=router.get('/logout', (req, res) => {
    console.log(req.cookies.token)
    if (!req.cookies.token) {
      return res.status(401).send('You are not logged in');
    }
    res.clearCookie('token');
    
    return res.status(200).send('Logged out successfully');
  });
  
module.exports=logout

