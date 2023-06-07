const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const { async } = require('crypto-random-string');
dotenv.config();
var transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  auth: {
    user: 'rescuerideminddeft@gmail.com',
    pass: process.env.EMAIL_PASS
  }
})

const sendMail = async (email, OTP) => {
  var mailOptions = {
    from: 'rescuerideminddeft@gmail.com',
    to: email,
    subject: 'OTP for Login',
    html: `
    <div className="OTP-template" style="background-color: #fff; padding: 30px; ">
      <h2>Verification Code</h2>
      <p>Please use the verification code below to login.</p>
      <h5 style="font-weight:700">${OTP}</h5>
      <p>If you didn't request this, you can ignore this email. <br />Thanks, <br/>Regards.</p>
    </div>`
  };
  transporter.sendMail(mailOptions, (err, res) => {
    if (err) {
      console.log(err)
      res.json({ err: 'error while sending OTP email to you. Please try again later' });
      return;
    }
  })
}

const sendPassMail = async (password, email, token) => {
  var mailOptions = {
    from: 'rescuerideminddeft@gmail.com',
    to: email,
    subject: 'Update your password',
    html: `
    <div className="OTP-template" style="background-color: #fff; padding: 30px; ">
      <h2>Please Update your password</h2>
      <p>This is your password: </p><h5 style="font-weight:700">${password}</h5>
      <p>To Update your password click on below link. The link is valid for only 1 day.</p>
      <h5 style="font-weight:700"><a href="https://rescueride.vercel.app/change-ctrl-pasword?token=${token}">Click here</a></h5>
      <p>If you didn't request this, you can ignore this email. <br />Thanks, <br/>Regards.</p>
    </div>`
  };
  transporter.sendMail(mailOptions, (err, res) => {
    if (err) {
      console.log(err)
      res.json({ err: 'error while sending OTP email to you. Please try again later' });
      return;
    }
  })
}

const sendBookingMail = async (email, id) => {
  var mailOptions = {
    from: 'rescuerideminddeft@gmail.com',
    to: email,
    subject: 'Booking Confirmed',
    html: `
    <div style="background-color: #fff; padding: 30px; ">
      <h2>Booking Confirmed for Booking ID: ${id}</h2>
      <p>This is your booking details link.</p>
      <h5 style="font-weight:700"><a href="https://rescueride.vercel.app/booking-details/${id}">Click here</a></h5>
      <p>Thanks, <br/>Regards.</p>
    </div>`
  };

  transporter.sendMail(mailOptions, (err, res) => {
    if (err) {
      console.log(err)
      res.json({ err: 'error while sending OTP email to you. Please try again later' });
      return;
    }
  })
}

module.exports = { sendMail, sendPassMail, sendBookingMail };