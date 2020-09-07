const BaseUseCase = require('../../utils/BaseUseCase');
const User = require('../../models/User');

class Delete extends BaseUseCase {
    static validationRules = {
        id : [ 'required', 'string', 'trim' ]
    };

    async execute({ id }) {
        try {
            await User.deleteFromFavorites(id, this.context.userId);

            return {
                meta: 'The article was successfully removed from favorites'
            }
        } catch (err) {
            throw err;
        }
    }
}

module.exports = Delete;