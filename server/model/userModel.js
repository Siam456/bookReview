const mongoose = require('mongoose');


const user = mongoose.Schema({
    username: {
        type: String,
        require: true,
        trim: true,
    },
    email: {
        type: String,
        require: true,
        trim: true,
        lowercase: true,
    },
    phone: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    avater: {
        type: String,
    },
    review: [
        {
            reivewid: mongoose.Types.ObjectId,
            bookid: mongoose.Types.ObjectId,
            bookTitle: String,
            bookauthor: String,
            bookCatagory: String,
            publishedyear: String,
            create: {
                type: Date,
                default: Date.now()
            }
        }
    ],
    role: {
        type: String,
        default: 'user',
        enum: ['user', 'admin']
    }
},{
    timestamps: true,
});

const people = mongoose.model('user', user);

module.exports = people;