const people = require('../model/userModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const getlogin =  (req, res) => {
    res.send('sasasa')
}

const postLogin = async (req, res) => {
    try{
        const response = await people.findOne({
            $or: [
                {phone: req.body.username},
                {username: req.body.username},
                {email: req.body.username}
            ]
        })

        const checkpass = await bcrypt.compare(req.body.password, response.password )
        if(checkpass){
            const userObj = {
                username: response.username,
                email: response.email,
                phone: response.phone,
                avater: response.avater,
                role: response.role,
                _id: response._id,
            };
            const token = jwt.sign(userObj, process.env.JWT_SECRATE , {
                expiresIn: process.env.JWT_EXPIRE,
            })
            //set cookies
            res.cookie(process.env.COOKIE_NAME, token,{
                maxAge: process.env.JWT_EXPIRE,
                signed: true,
                })
            res.send('ok')
        }
    } catch(err){
        res.status(500).json({
            errors: err.message
        })
    }
}

module.exports = { getlogin, postLogin }