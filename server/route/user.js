const express = require('express');
const multer = require('multer');

const route = express.Router();
const { getUser, postUser, editUser, deleteUser } = require('../controller/userController')

const upload = require('../utilities/singleupload')

const { validationEdit, checkValidationEdit } = require('../middleware/userValidation/userEditValidator');
const { validation, checkValidation } = require('../middleware/userValidation/userValidation');

const checklogin = require('../middleware/common/checklogin');

const convertBody = ((req,res,next) => {
    const body = JSON.parse(req.body.user)
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
route.get('/', checklogin,  getUser);
route.post('/', upload.single('avater'), convertBody, validation, checkValidation, postUser);
route.put('/:id', checklogin, upload.single('avater'), convertBody, validationEdit, checkValidationEdit, checkAdmin, editUser);
route.delete('/:id', checklogin, checkAdmin, deleteUser);

module.exports = route;