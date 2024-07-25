const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  service: 'gmail',
  server: 'smtp.gmail.com',
  port: process.env.SMTP_PORT,
  auth: {
    user: '',
    pass: '',
  },
});
const mailOptions = {
  from: `"${process.env.FROM_EMAIL_NAME}"<${process.env.FROM_EMAIL}>`, // sender address
  to: '', // list of receivers
  subject: 'Register Success', // Subject line
  bcc: process.env.SB_EMAIL_ID,
  html: '<b>Welcome to Demo App !!! :</b>', // html body
  attachments: []
};
module.exports = {
  transporter, mailOptions,
};


