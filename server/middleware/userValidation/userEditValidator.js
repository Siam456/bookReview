const { check, validationResult } = require('express-validator');


const fs = require('fs');
const path = require('path');
const createHttpError = require('http-errors');
const people = require('../../model/userModel')


const validationEdit = [
    check('username')
        .isLength({min: 1})
        .withMessage('userName Is Required')
        .trim(),
    check('email')
        .isEmail()
        .withMessage("Invalid email address")
        .trim(),
    check("phone")
        .isMobilePhone('bn-BD')
        .withMessage("Enter a Bangladeshi mobile number")
        .trim(),
    check("password")   
        .isLength({min: 5})
        .withMessage('password must be at least 8 chars long'),
]

const checkValidationEdit = (req, res, next) => {
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

module.exports = { validationEdit, checkValidationEdit }