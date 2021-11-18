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
    title: {
        type: String,
        require: true
    },
    author: {
        type: String,
        require: true
    },
    publication: {
        type: String,
        require: true
    },
    publishedyear: {
        type: Date,
        require: true
    },
    avatar: {
        type: String,
        require: true,
        default: null
    },
    review: [
        {
            type: mongoose.Types.ObjectId,
            ref: "review"
        }
    ],
    catagory: {
        type: String,
        require: true
    },
},
{
    timestamps: true,
});

const book = mongoose.model('book', Schema);

module.exports = book;