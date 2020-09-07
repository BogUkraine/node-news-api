const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    port               : process.env.PORT,
    mongoURI           : process.env.MONGO_URI,
    newsApiKey         : process.env.NEWS_API_KEY,
    cronTimezone       : process.env.CRON_TIMEOUT_TIMEZONE,
    cronTimeout        : process.env.CRON_TIMEOUT,
    jwtSecret          : process.env.JWT_SECRET,
    googleClientId     : process.env.GOOGLE_CLIENT_ID,
    googleClientSecret : process.env.GOOGLE_CLIENT_SECRET,
    googleRedirectUrl  : process.env.GOOGLE_REDIRECT_URL,
    googleAccessType   : process.env.GOOGLE_ACCESS_TYPE,
    googleScope        : process.env.GOOGLE_SCOPE,
    cacheTTL           : process.env.CACHE_TIME_TO_LIVE
}