const BaseUseCase = require('../../utils/BaseUseCase');
const Feed = require('../../models/Feed.js');
const dumpFeed = require('../../dumps/feed');

class Create extends BaseUseCase {
    static validationRules = {
        source      : [ 'required', { 'nested_object' : {
            id   : [ 'required', 'string', { max_length: 255 }, 'trim' ],
            name : [ 'required', 'string', { max_length: 255 }, 'trim' ]
        }}],
        author      : [ 'required', 'string', { max_length: 255 }, 'trim' ],
        title       : [ 'required', 'string', { max_length: 255 }, 'trim' ],
        description : [ 'required', 'string', { max_length: 2048 }, 'trim' ],
        url         : [ 'required', 'url', { max_length: 600 }, 'trim' ],
        publishedAt : [ 'required', 'iso_date' ],
        content     : [ 'required', 'string', { max_length: 65535 }, 'trim' ],
    };

    async execute(data) {
        try {
            await Feed.create({ ...data, createdBy: this.context.userId });

            return {
                meta: 'The article was successfully added'
            }
        } catch (err) {
            throw new Error(err);
        }
    }
}

module.exports = Create;