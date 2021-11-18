const mongoose = require('mongoose');

const Schema = mongoose.Schema({
    user: {
        id: mongoose.Types.ObjectId,
        username: String,
        phone: String,
        email: String,
        avater: String,
        role: String,
    },
    book:{
        id: mongoose.Types.ObjectId,
    },
    review: {
        type: String,
        require: true
    },
    reating: {
        type: Number,
        require: true
    },
    like: [
        {
            type: mongoose.Types.ObjectId,
        }
    ],
    comment: [
        {
            text: String,
            userinfo: {
                id: mongoose.Types.ObjectId,
                username: String,
                phone: String,
                email: String,
                avater: String,
                role: String,
            },
            create: {
                type: Date,
                default: Date.now()
            }
        },
    ],
},
{
    timestamps: true,
});

const review = mongoose.model('review', Schema);

module.exports = review;