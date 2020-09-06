const BaseUseCase = require('../../utils/BaseUseCase');
const Feed = require('../../models/Feed.js');

class Create extends BaseUseCase {
    static validationRules = {
        id : [ 'required', 'string', 'trim' ]
    };

    async execute({ id }) {
        try {
            //await Feed.create(data); logic with favorites

            return {
                meta: 'The article was successfully added to favorites'
            }
        } catch (err) {
            throw new Error(err);
        }
    }
}

module.exports = Create;