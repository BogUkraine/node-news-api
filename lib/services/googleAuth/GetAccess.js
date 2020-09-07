const BaseUseCase            = require('../../utils/BaseUseCase');
const { oAuth2ClientGoogle } = require('../../utils/googleAuth');
const config                 = require('../../../config');

class GetAccess extends BaseUseCase {
    static validationRules = {};

    async execute() {
        try {
            const redirectLink = oAuth2ClientGoogle.generateAuthUrl({
                access_type : config.googleAccessType,
                scope       : config.googleScope
            });
    
            return {
                redirectLink
            };
        } catch(error) {
            throw error
        }
    }
}

module.exports = GetAccess;