const config = require("../config");
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.emailUser,
    pass: config.emailPass
  }
});

module.exports.sendEmail = async function(to, subject, flight){
  const mailOptions = {
    from: config.emailUser,
    to: to,
    subject: subject,
    text: `The flight with number - ${flight.flightNumber} status's has been updated and is ${flight.status} and will fly on ${flight.ScheduledDepartureTime} from gate number - ${flight.gate}. Please check our website for more details`
  };

  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
      return;
    } else {
      console.log('Email sent:', info.response);
      return info.response;
    }
  });
};
