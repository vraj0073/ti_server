const nodemailer = require("nodemailer");

const sendMail = async (receiverEmail, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "nodemailer9099@gmail.com",
      pass: "nm909999",
    },
  });

  const mailOptions = {
    from: "nodemailer9099@gmail.com",
    to: receiverEmail,
    subject: "Your OTP is here!",
    text: "Your OTP is: " + otp,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return "Error";
    } else {
      return "Sucess";
    }
  });
};

module.exports = sendMail;
