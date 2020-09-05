const BaseUseCase = require('../../utils/BaseUseCase');
const Feed = require('../../models/Feed');
const dumpFeed = require('../../dumps/feed');

class Show extends BaseUseCase {
    static validationRules = {};

    async execute() {
        const feeds = await Feed.find();

        return {
            feeds: feeds.map(dumpFeed.feedShow),
            meta: 'ok'
        }
    }
}

module.exports = Show;