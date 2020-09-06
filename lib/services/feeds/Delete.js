const BaseUseCase = require('../../utils/BaseUseCase');
const Feed = require('../../models/Feed.js');

class Delete extends BaseUseCase {
    static validationRules = {
        id : [ 'required', 'string', 'trim' ]
    };

    async execute({id}) {
        try {
            await Feed.deleteOne({ _id: id });

            return {
                status: 1,
                meta: 'The article was successfully deleted'
            }
        } catch (err) {
            throw new Error(err);
        }
    }
}

module.exports = Delete;