const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    title : {type: String, required: true},
    description : {type: String, required: true},
});

class Feed extends mongoose.Model {
    static checkFeed() {
        console.log('feed')
    }
}

module.exports = mongoose.model(Feed, schema, 'user');
