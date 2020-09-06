const BaseUseCase = require('../../utils/BaseUseCase');
const Feed = require('../../models/Feed.js');
const dumpFeed = require('../../dumps/feed');

class Show extends BaseUseCase {
    static validationRules = {
        page  : [ 'required', 'positive_integer', 'trim' ],
        limit : [ 'required', 'positive_integer', 'trim' ],
    };

    async execute({ page, limit }) {
        try {
            const feeds = await Feed.find()
            .skip(+limit * +page)
            .limit(+limit);

            return {
                feeds: feeds.map(dumpFeed.feedShow),
                meta: 'ok'
            }
        } catch (err) {
            throw new Error(err);
        }
    }
}

module.exports = Show;