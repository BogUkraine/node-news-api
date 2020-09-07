const mongoose = require('mongoose');
const newsApi  = require('../utils/newsApi');

const Base = require('./Base');

const schema = new mongoose.Schema({
    source      : { 
        id   : { type: String, required: true },
        name : { type: String, required: true }
    },
    author      : { type: String, required: true },
    title       : { type: String, required: true },
    description : { type: String, required: true },
    url         : { type: String, required: true },
    publishedAt : { type: Date, required: true },
    content     : { type: String, required: true },
    createdBy   : { type: String, ref: 'User' }
});

class Feed extends Base {
    static NEWS_API_SOURCE   = 'bbc-news,the-verge';
    static NEWS_API_TOPIC    = 'bitcoin';
    static NEWS_API_LANGUAGE = 'en';

    static async postDataFromNewsApi() {
        const feeds = await newsApi.v2.everything({
            sources  : this.NEWS_API_SOURCE,
            q        : this.NEWS_API_TOPIC,
            sortBy   : this.NEWS_API_LANGUAGE,
            language : this.NEWS_API_LANGUAGE,
        });

        if (feeds.status === 'ok') {
            await Feed.insertMany(feeds.articles);
        } else {
            throw new Error('news api error')
        }

        return feeds.articles;
    }

    static async deleteOne(userId, feedId) {
        const feed = await this.findOne({ 
            _id       : feedId, 
            createdBy : userId
        });

        if (!feed) {
            throw {
                meta : 'You do not have permissions'
            }
        }

        await feed.deleteOne();
    }
}

module.exports = mongoose.model(Feed, schema, 'Feed');
