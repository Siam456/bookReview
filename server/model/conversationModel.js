const mongoose = require('mongoose');

const Schema = mongoose.Schema({
    creator: {
        id: mongoose.Types.ObjectId,
        username: String,
        phone: String,
        email: String,
        avatar: String,
        role: String,
    },
    participent: {
        id: mongoose.Types.ObjectId,
        username: String,
        email: String,
        phone: String,
        avater: String,
        role: String,
    },
    last_update: {
        type: Date,
        default: Date.now,
    }
},
{
    timestamps: true,
});

const conversationModel = mongoose.model('conversation', Schema);

module.exports = conversationModel;