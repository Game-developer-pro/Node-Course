const mongoose = require('mongoose');
const env = require('../.././.env');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(env.mongoDB_url);

        if (conn) {
            console.log(`MongoDB Connected Successfully`);
        }

    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}


module.exports = connectDB;

