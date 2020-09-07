const mongoose = require('mongoose');
const bcrypt   = require('bcrypt');
const jwt      = require('jsonwebtoken');
const config   = require('../../config');

const Feed = require('./Feed.js');

const schema = new mongoose.Schema({
    email     : { type: String, required: true, unique: true },
    password  : { type: String, required: true },
    favorites : [{ type: mongoose.Schema.Types.ObjectId }]
});

class User extends mongoose.Model {
    static async register(data) {
        const user = await this.findOne({ email : data.email });
        
        if (user) {
            throw {
                email : 'User with this email already exists'
            }
        }

        const hashedPassword = await bcrypt.hash(data.password, 12);

        await this.create({
            email    : data.email,
            password : hashedPassword
        });
    }

    static async login(data) {
        const user = await this.findOne({ email: data.email });

        if (!user) {
            throw {
                meta : 'Wrong data'
            }
        }

        const isPasswordsIdentical = await bcrypt.compare(data.password, user.password);
        if (!isPasswordsIdentical) {
            throw {
                meta : 'Wrong data'
            }
        }

        const token = jwt.sign(
            { id : user.id },
            config.jwtSecret,
            { expiresIn : '1h' },
        );

        return token;
    }

    static async addToFavorites(feedId, userId) {
        const feed = await Feed.findById(feedId);
        const user = await this.findById(userId);

        let alreadyAdded = false;
        user.favorites.forEach((item) => {
            if (item.equals(feed._id)) { 
                alreadyAdded = true;
            }
        })

        if (alreadyAdded) {
            return {
                meta : 'This feed is already in your favorites' 
            }
        }

        await user.updateOne({ $push : { favorites : feed._id } });
    }
}

module.exports = mongoose.model(User, schema, 'User');
