const mongoose = require('mongoose');
const { createConnection } = require('../config/database');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phone: {
        type: String
    },
    address: {
        street: String,
        city: String,
        state: String,
        zipCode: String,
        country: String
    },
    age: {
        type: Number
    },
    occupation: {
        type: String
    },
    company: {
        type: String
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const getUserModel = async (isReadOnly = false) => {
    const conn = await createConnection('users_db', isReadOnly);
    return conn.model('User', userSchema);
};

module.exports = getUserModel;