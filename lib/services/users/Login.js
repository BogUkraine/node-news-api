const BaseUseCase = require('../../utils/BaseUseCase');
const User = require('../../models/User.js');

class Login extends BaseUseCase {
    static validationRules = {
        email          : ['required', 'email', 'trim'],
        password       : ['required', 'string', 'trim'],
    };

    async execute(data) {
        try {
            const token = await User.login(data);

            return {
                token,
                meta : 'User was successfully logined'
            }
        } catch (err) {
            throw err;
        }
    }
}

module.exports = Login;