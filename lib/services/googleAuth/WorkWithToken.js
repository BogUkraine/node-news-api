const BaseUseCase = require('../../utils/BaseUseCase');
const User        = require('../../models/User');

class WorkWithToken extends BaseUseCase {
    static validationRules = {
        code : ['required', 'string']
    };

    async execute({ code }) {
        try {
            const token = await User.loginWithGoogle(code);
    
            return {
                meta  : 'User successfully passed google verification',
                token,
            };
    
        } catch(error) {
            console.log(error)
            return {
                redirectLink : '/api/auth/google'
            }
        }
    }
}

module.exports = WorkWithToken;