const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    port            : process.env.PORT,
    mongoURI        : process.env.MONGO_URI,
    newsApiKey      : process.env.NEWS_API_KEY,
    cronTimezone    : process.env.CRON_TIMEOUT_TIMEZONE,
    cronTimeout     : process.env.CRON_TIMEOUT
}