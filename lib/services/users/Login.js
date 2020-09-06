const BaseUseCase = require('../../utils/BaseUseCase');
const User = require('../../models/User.js');

class Login extends BaseUseCase {
    static validationRules = {
        email          : ['required', 'email', 'trim'],
        password       : ['required', 'email', 'trim'],
    };

    async execute(data) {
        try {
            await User.login(data);

            return {
                meta : 'User was successfully logined'
            }
        } catch (err) {
            throw new Error(err);
        }
    }
}

module.exports = Login;