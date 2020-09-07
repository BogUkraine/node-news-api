const { google }       = require('googleapis');
const { OAuth2Client } = require('google-auth-library');
const config           = require('../../config');

const oAuth2ClientGoogle = new google.auth.OAuth2(
    config.googleClientId, 
    config.googleClientSecret, 
    config.googleRedirectUrl
);

const client = new OAuth2Client(config.googleClientId);

const verifyToken = async (token) => {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: config.googleClientId,
    });

    const payload = ticket.getPayload();
    const userInfo = { sub : payload.sub, email : payload.email };

    return userInfo;
}

module.exports = { oAuth2ClientGoogle, verifyToken }