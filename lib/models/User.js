const mongoose = require('mongoose');
const bcrypt   = require('bcrypt');
const jwt      = require('jsonwebtoken');
const config   = require('../../config');

const schema = new mongoose.Schema({
    email    : {type: String, required: true, unique: true},
    password : {type: String, required: true},
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
            { userId: user.id },
            config.jwtSecret,
            { expiresIn: '1h' },
        );

        return token;
    }
}

module.exports = mongoose.model(User, schema, 'User');
