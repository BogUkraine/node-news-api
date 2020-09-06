const BaseUseCase = require('../../utils/BaseUseCase');
const Feed = require('../../models/Feed.js');
const dumpFeed = require('../../dumps/feed');

class PostFromApi extends BaseUseCase {
    static validationRules = {};

    async execute() {
        try {
            const feeds = await Feed.postDataFromNewsApi();

            return {
                feeds: feeds.map(dumpFeed.feedShow),
                meta: 'ok'
            }
        } catch (err) {
            throw new Error(err);
        }
    }
}

module.exports = PostFromApi;