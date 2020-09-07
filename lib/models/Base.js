const mongoose = require('mongoose');

class Base extends mongoose.Model {
    static async findByIdOrFail(id) {
        const item = await super.findById(id);
        if (!item) {
            throw {
                meta : 'there are no such item'
            }
        }

        return item;
    }

    static async findOneOrFail(params) {
        const item = await super.findOne(params);
        if (!item) {
            throw {
                meta : 'there are no such item'
            }
        }

        return item;
    }
}

module.exports = Base;