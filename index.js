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






app.use('/', register)
app.use('/', login)
app.use('/',forgetPassword)
app.use('/',resetPassword)
app.use("/",logout)
app.use("/",logoutAll)
  app.listen(PORT,()=>{
    console.log("server is running")
  })
  
  