const express = require('express');
const mysql = require('mysql');
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const { v4: uuidv4 } = require('uuid');
const randomstring=require("randomstring")
const randomize=require("randomize")
const {sendMail}=require("../src/controller/sendMail")
const nodemailer = require('nodemailer');


const cookieParser = require('cookie-parser');
const register = require("../src/route/signup")
const login=require("../src/route/login");
const forgetPassword = require('../src/route/forgotPassword');
const resetPassword=require("../src/route/resetPassword")
const logout=require("../src/route/logout")
const logoutAll=require("../src/route/logoutall")
// const forgetPassword=require("../")

const app = express();

app.use(express.json());
app.use(cookieParser());


require('dotenv').config();



const PORT = process.env.PORT || 3000;
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_USER = process.env.DB_USER || 'root';
const DB_PASSWORD = process.env.DB_PASSWORD || 'Nikhil@98';
const DB_NAME = process.env.DB_NAME || 'auth_db';
const JWT_SECRET = process.env.JWT_SECRET || 'mysecret';
const MAIL_USER = process.env.MAIL_USER || '';
const MAIL_PASSWORD = process.env.MAIL_PASSWORD || '';
const connection = mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
  });
  
  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to database:', err);
    } else {
      console.log('Connected to database');
    }
  });




// app.post('/forgot-password', async (req, res) => {
//   var email = req.body.email;
//   connection.query(`SELECT * FROM users where email=? limit 1`, email, function(error, result){
//     if (error) {
//       return res.status(400).json({message: error});
//     }
//     if (result.length > 0) {
//       const otp = Math.ceil(Math.random()*10000); // generates a 6-digit OTP
//       console.log(otp)
//       let mailSubject = 'Forget Password';
//       let content = `<p>Hello ${result[0].name},</p><p>Please use the following OTP to reset your password: <strong>${otp}</strong></p>`;
//       console.log(content)
//       sendMail(email,mailSubject,content);
//       connection.query(`INSERT INTO reset_tokens (email,token) VALUES(${connection.escape(result[0].email)},'${otp}')`);
//       return res.send("OTP sent successfully");
//     }
//   });
// });





// Endpoint for resetting user password




// app.post('/reset-password', (req, res) => {
//   const { email, newPassword, otp } = req.body;

//   // Check if the email exists in the database
//   connection.query('SELECT * FROM users WHERE email = ?', email, (error, results) => {
//     if (error) {
//       res.status(500).json({
//         message: 'Internal server error'
//       });
//     } else if (results.length === 0) {
//       res.status(404).json({
//         message: 'User not found'
//       });
//     } else {
  
//       bcrypt.hash(newPassword, 10, (err, hash) => {
//         if (err) {
//           res.status(500).json({
//             message: 'Internal server error'
//           });
//         } else {
         
//           connection.query('UPDATE users SET password = ? WHERE email = ?', [hash, email], (error, results) => {
//             if (error) {
//               res.status(500).json({
//                 message: 'Internal server error'
//               });
//             } else {
//               res.status(200).json({
//                 message: 'Password updated successfully'
//               });
//             }
//           });
//         }
//       });
//     }
//   });
// });




// app.get('/logout', (req, res) => {
//   console.log(req.cookies.token)
//   if (!req.cookies.token) {
//     return res.status(401).send('You are not logged in');
//   }
//   res.clearCookie('token');
  
//   return res.status(200).send('Logged out successfully');
// });




// POST /logout-all-devices - Allow user to logout of all the devices.

// app.post('/logout-all-devices', (req, res) => {
//   const { userId } = req.body;

  
//   connection.query('DELETE FROM sessions WHERE user_id = ?', userId, (error, results) => {
//     if (error) {
//       res.status(500).json({
//         message: 'Internal server error'
//       });
//     } else {
//       res.status(200).json({
//         message: 'Logged out of all devices successfully'
//       });
//     }
//   });
// });


app.use('/', register)
app.use('/', login)
app.use('/',forgetPassword)
app.use('/',resetPassword)
app.use("/",logout)
app.use("/",logoutAll)
  app.listen(PORT,()=>{
    console.log("server is running")
  })
  
  