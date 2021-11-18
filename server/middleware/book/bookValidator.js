const { check, validationResult } = require('express-validator');


const fs = require('fs');
const path = require('path');
const createHttpError = require('http-errors');
const people = require('../../model/userModel')


const bookValidator = [
    check('title')
        .isLength({min: 1})
        .withMessage('userName Is Required'),
    check('author')
        .isLength({min: 1})
        .withMessage('userName Is Required'),
    check('publication')
        .isLength({min: 1})
        .withMessage('userName Is Required')
]

const checkBookValidator = (req, res, next) => {
    const errors = validationResult(req);
    const mapError = errors.mapped();
    if(Object.keys(mapError).length === 0){
        next();
    } else{
        if(req.file){
            console.log(errors)
            const delPath =path.join(__dirname, '..' , '..' , '..', `public/userUpload/${req.file.filename}`)
            fs.unlinkSync(delPath);
            res.status(500).json({
                errors: mapError,
            })

        } else{
            res.status(500).json({
                errors: mapError
            })
        }
        
    }
}

module.exports = { bookValidator, checkBookValidator }