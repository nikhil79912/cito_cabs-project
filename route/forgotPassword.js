const express = require('express');
const mysql = require('mysql');
const {sendMail}=require("../controller/sendMail")
const nodemailer = require('nodemailer');
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

const forgetPassword=router.post('/forgot-password', async (req, res) => {
    var email = req.body.email;
    connection.query(`SELECT * FROM users where email=? limit 1`, email, function(error, result){
      if (error) {
        return res.status(400).json({message: error});
      }
      if (result.length > 0) {
        const otp = Math.floor(Math.random()*10000+1); // generates a 6-digit OTP
        console.log(otp)
        let mailSubject = 'Forget Password';
        let content = `<p>Hello ${result[0].name},</p><p>Please use the following OTP to reset your password: <strong>${otp}</strong></p>`;
        console.log(content)
        sendMail(email,mailSubject,content);
        connection.query(`INSERT INTO reset_tokens (email,token) VALUES(${connection.escape(result[0].email)},'${otp}')`);
        return res.send("OTP sent successfully");
      }
    });
  });

  module.exports=forgetPassword












