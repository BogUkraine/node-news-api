const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const schema = new mongoose.Schema({
    email    : {type: String, required: true, unique: true},
    password : {type: String, required: true},
});

class User extends mongoose.Model {
    static async register(data) {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        await User.register({
            email    : data.email,
            password : hashedPassword
        });
    }

    static async login(data) {
        const user = await this.find({ email: data.email });

        if (!user) {
            return {
                meta   : 'There are no user with this email'
            }
        }

        const hashedPassword = await bcrypt.hash(data.password, 10);

        console.log(hashedPassword, data.password, user.password)
        if (hashedPassword !== data.password) {
            return {
                meta : 'Wrong data'
            }
        }
    }
}

module.exports = mongoose.model(User, schema, 'user');
