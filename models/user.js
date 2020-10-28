const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        lowercase: true,
        required: true
    },
    hashed_password: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        default: 0
    },
    salt: String,
}, { timestamps: true });

userSchema.virtual('password')
    .set(function(password){
        this._password = password;
        this.salt = this.makeSalt;
        this.hashed_password = this.securePassword(password);
    })
    .get(function(){
        return this._password
    })

userSchema.methods = {
    makeSalt: function () {
        return uuidv4();
    },
    securePassword: function (plainPassword) {
        if(!plainPassword) return ""
        try {
            return crypto.createHmac('sha256', process.env.PASSWORD_HASH_SECRET)
                   .update(plainPassword)
                   .digest('hex');
        } catch (err) {
            return ''
        }
    },
    authenticate: function (plainPassword) {
        return this.securePassword(plainPassword) === this.hashed_password
    }
}

module.exports = User = mongoose.model('User', userSchema);