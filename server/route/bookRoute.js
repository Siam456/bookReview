const express = require('express')

const route = express.Router();

const upload = require('../utilities/bookupload');

const checklogin = require('../middleware/common/checklogin');
const { bookValidator, checkBookValidator } = require('../middleware/book/bookValidator');

const { getBook, postBook, deleteBook, editBook } = require('../controller/bookController');


const convertBody = ((req,res,next) => {
    const body = JSON.parse(req.body.book)
    req.body = body;
    //console.log(req.body) 
    next();
});

const checkAdmin = (req, res, next) => {
    if(req.user.role === 'admin'){
        next();
    } else{
        res.status(500).json({
            mag: 'only admin access'
        })
    }
}

route.get('/', checklogin, getBook);

route.post('/', checklogin, checkAdmin, upload.single('avater'), convertBody, bookValidator, checkBookValidator,  postBook);
route.delete('/:id', checklogin, deleteBook);
route.put('/:id', checklogin, editBook);

module.exports = route;