const BaseUseCase = require('../../utils/BaseUseCase');
const User        = require('../../models/User');

const dump = require('../../dumps/feed');

class Show extends BaseUseCase {
    static validationRules = {};

    async execute() {
        try {
            const favorites = await User.findFavorites(this.context.userId);

            return {
                favorites : favorites.map(dump.favoritesShow),
                meta      : 'The article was successfully removed from favorites'
            }
        } catch (err) {
            throw new Error(err);
        }
    }
}

module.exports = Show;