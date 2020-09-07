const BaseUseCase = require('../../utils/BaseUseCase');
const User = require('../../models/User');

class Create extends BaseUseCase {
    static validationRules = {
        id : [ 'required', 'string', 'trim' ]
    };

    async execute({ id }) {
        try {
            await User.addToFavorites(id, this.context.userId);

            return {
                meta: 'The article was successfully added to favorites'
            }
        } catch (err) {
            throw err;
        }
    }
}

module.exports = Create;