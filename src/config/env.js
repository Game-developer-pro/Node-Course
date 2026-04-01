const dotenv = require("dotenv");
dotenv.config();

const env = {
    mongoDB_url: process.env.MONGODBURL,
    port: process.env.PORT,
    jwt_secret: process.env.JWT_SECRET,
    expire_in: process.env.EXPIRE_IN,
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,

}

module.exports = env;