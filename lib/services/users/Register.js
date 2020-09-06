const BaseUseCase = require('../../utils/BaseUseCase');
const User = require('../../models/User.js');

class Register extends BaseUseCase {
    static validationRules = {
        email          : [ 'required', 'email', 'trim' ],
        password       : [ 'required', 'string', 'trim', { length_between: [6, 50] } ],
        repeatPassword : [ 'required', 'string', 'trim', { equal_to_field: 'password' } ],
    };

    async execute(data) {
        try {
            await User.register(data);

            return {
                meta : 'User was successfully registered'
            }
        } catch (err) {
            throw err;
        }
    }
}

module.exports = Register;