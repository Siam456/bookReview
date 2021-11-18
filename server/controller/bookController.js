const bookModel = require('../model/bookModel');
const fs = require('fs');
const reviewModel = require('../model/reviewModel')

const getBook = async(req, res) => {
    try{
        const response = await bookModel.find({});
        
        res.json({
            book: response,
        })
    }catch(err){
        res.status(500).json({
            err: err.message,
        })
    }
}

const postBook = async(req, res) => {
    try{
        //console.log(req.body)
        //console.log(req.file)
        let book;
        if(req.file){
            book = new bookModel({
                ...req.body,
                avatar: req.file.filename,
                user: {
                    id: req.user._id,
                    username: req.user.username,
                    phone: req.user.phone,
                    email: req.user.email,
                    avatar: req.user.avatar,
                    role: req.user.role,
                },
            })
        } else{
            book = new bookModel({
                ...req.body,
                user: {
                    id: req.user._id,
                    username: req.user.username,
                    phone: req.user.phone,
                    email: req.user.email,
                    avater: req.user.avater,
                    role: req.user.role,
                },
            })
        }
        const response = await book.save();
        res.json({
            response
        });


    }catch(err){
        res.status(500).json({
            err: err.message,
        })
    }
}

const deleteBook = async(req, res) => {
    try{
        const response = await bookModel.findByIdAndDelete({_id: req.params.id});

        //console.log(response)
        for(var element of response.review){
            const deleteReview = await reviewModel.deleteMany({_id: element});

            console.log(deleteReview);
        }
        
        const delpath = `${__dirname}/../clint/public/bookUpload/${response.avatar}`;
        //console.log(__dirname)
          fs.unlinkSync(delpath);

        

        


        res.json({
            book: response,
        })
    }catch(err){
        res.status(500).json({
            err: err.message,
        })
    }
}
const editBook = async(req, res) => {
    try{
        //console.log(req.body)
        //console.log(req.params.id)
        const response = await bookModel.findByIdAndUpdate({_id: req.params.id},{
            $set: {...req.body}
        })

        res.json({
            book: response,
        })
    }catch(err){
        res.status(500).json({
            err: err.message,
        })
    }
}

module.exports = { getBook, postBook, deleteBook, editBook };