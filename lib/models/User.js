const mongoose = require('mongoose');
const bcrypt   = require('bcrypt');
const jwt      = require('jsonwebtoken');
const config   = require('../../config');
const cache    = require('../utils/Cache');

const { oAuth2ClientGoogle, verifyToken } = require('../utils/googleAuth');

const Base = require('./Base.js');
const Feed = require('./Feed.js');

const schema = new mongoose.Schema({
    email     : { type : String, required : true, unique : true, index: true },
    password  : { type : String },
    sub       : { type : String, index: true },
    favorites : [{ type : mongoose.Schema.Types.ObjectId }]
});

class User extends Base {
    static async register(data) {
        const user = await this.findOne({ email : data.email });
        
        if (user) {
            throw {
                email : 'Wrong data'
            }
        }

        const hashedPassword = await bcrypt.hash(data.password, 12);

        await this.create({
            email    : data.email,
            password : hashedPassword
        });
    }

    static async login(data) {
        const user = await this.findOneOrFail({ email: data.email });

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
        const feed = await Feed.findByIdOrFail(feedId);
        const user = await this.findByIdOrFail(userId);

        let alreadyAdded = false;
        user.favorites.forEach((item) => {
            if (item.equals(feed._id)) { 
                alreadyAdded = true;
            }
        })

        if (alreadyAdded) {
            throw {
                meta : 'This feed is already in your favorites' 
            }
        }

        await user.updateOne({ $push : { favorites : feedId } });
        cache.set(feed);
    }

    static async deleteFromFavorites(feedId, userId) {
        await this.updateOne({ _id : userId }, { $pull : { favorites : feedId } });
    }

    static async findFavorites(userId) {
        const user = await this.findByIdOrFail(userId);
        return await cache.getSeveral(
            user.favorites, 
            () => Feed.find({
                _id : { $in : user.favorites }
            })
        );
    }

    static async loginWithGoogle(code) {
        const googleToken = await oAuth2ClientGoogle.getToken(code);
        const userData = await verifyToken(googleToken.tokens.id_token);

        const user = await this.findOne({ sub : userData.sub });
        let newUser = {};

        if (!user) {
            newUser = await this.create({
                sub   : userData.sub,
                email : userData.email
            })
        }

        const token = jwt.sign(
            { userId : user ? user._id : newUser._id },
            config.jwtSecret,
            { expiresIn : '1h' },
        );

        return token;
    }
}

module.exports = mongoose.model(User, schema, 'User');
