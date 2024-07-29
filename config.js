require('dotenv').config()

module.exports = {
    dbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/imageProcessingDB',
    port:process.env.PORT || 8000
};

