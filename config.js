require('dotenv').config()

module.exports = {
    dbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/imageProcessingDB',
    port:process.env.PORT || 8000,
    jwt:process.env.JWT_SECRET,
    twilioAccountSid:process.env.TWILIO_ACCOUNT_SID,
    twilioAuthToken:process.env.TWILIO_AUTH_TOKEN,
    emailUser:process.env.EMAIL_USER,
    emailPass:process.env.EMAIL_PASS,
    emailTo:process.env.EMAIL_TO,
    twilioNumber:process.env.TWILIO_NUMBER
};

