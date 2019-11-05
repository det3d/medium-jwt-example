const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

//define schema
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    password: {
        type: String,
        trim: true,
        required: true
    },
    avatar: {
        type: String,
        trim: true,
        required: false
    },
    licensePlate: {
        type: String,
        trim: true,
        required: false
    },
    driversLicense: {
        type: String,
        trim: true,
        required: false
    },
    startDate: {
        type: Date,
        required: false
    },
    data: [new mongoose.Schema({
        _id: false,
        Name: {
            type: String
        },
        Text: {
            type: String
        }
    }, {
        strict: false
    })],
    logins: [new mongoose.Schema({
        _id: false,
        Name: {
            type: String
        },
        Text: {
            type: String
        }
    }, {
        strict: false
    })]
});

//hash user password before saving into database
UserSchema.pre('save', function (next) {
    this.password = bcrypt.hashSync(this.password, saltRounds);
    next();
});

module.exports = mongoose.model('User', UserSchema);