  
const nodemailer = require('nodemailer');
  const sendMail=async (email,subject,content)=>{
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, 
        auth: {
          user: 'nikhilgkp97@gmail.com', 
          pass: 'bamtvesuwcqinxrh' 
        }
      });
      
      
      let mailOptions = {
        from: email, 
        to: "nikhilgkp97@gmail.com", 
        subject: subject, 
        text: content, 
        html: content 
      };
      
      
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
      });
  }

  module.exports.sendMail=sendMail