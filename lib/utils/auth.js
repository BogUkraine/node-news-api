const jwt    = require('jsonwebtoken');
const config = require('../../config');

const checkToken = async (headers) => {
    try {
        if (!headers.authorization) {
            throw {
                meta: 'User is not authenticated'
            }
        }

        const token = headers.authorization.split(' ')[1];
        if (!token) {
            throw {
                meta: 'User is not authenticated'
            }
        }

        const decoded = jwt.verify(token, config.jwtSecret);
        
        return {
            userId : decoded.id,
        };
    } catch (error) {
        throw error;
    }
}

module.exports = checkToken;