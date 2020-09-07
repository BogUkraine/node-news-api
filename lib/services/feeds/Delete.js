const BaseUseCase = require('../../utils/BaseUseCase');
const Feed        = require('../../models/Feed.js');

class Delete extends BaseUseCase {
    static validationRules = {
        id : [ 'required', 'string', 'trim' ]
    };

    async execute({ id }) {
        try {
            await Feed.deleteOne(this.context.userId, id);

            return {
                meta: 'The article was successfully deleted'
            }
        } catch (err) {
            throw err;
        }
    }
}

module.exports = Delete;