const mongoose = require('mongoose');
//const Base = require('./Base');

const schema = new mongoose.Schema({
    email    : {type: String, required: true, unique: true},
    password : {type: String, required: true},
});

class User extends mongoose.Model {
    static check() {
        console.log('kek')
    }
}

module.exports = mongoose.model(User, schema, 'user');
