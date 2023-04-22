  
const nodemailer = require('nodemailer');
  const sendMail=async (email,subject,content)=>{
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: 'nikhilgkp97@gmail.com', // replace with your email
          pass: 'bamtvesuwcqinxrh' // replace with your password
        }
      });
      
      // setup email data with unicode symbols
      let mailOptions = {
        from: email, // sender address
        to: "nikhilgkp97@gmail.com", // list of receivers
        subject: subject, // Subject line
        text: content, // plain text body
        html: content // html body
      };
      
      // send mail with defined transport object
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
      });
  }

  module.exports.sendMail=sendMail