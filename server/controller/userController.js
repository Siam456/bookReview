const bcrypt = require('bcrypt');
const fs = require('fs');
const people = require('../model/userModel');

const getUser = async (req, res) => {
    try{
        const response = await people.find({}, {password: 0}).sort({review: "desc"})
        res.json({
            response,
        })

    } catch(err){
        res.status(500).json({
            errors: err.message,
        })
    }
}

const postUser = async (req, res) => {
    const salt = 10;
    const hashpass = await bcrypt.hash(req.body.password, salt);

    try{
        if(req.file){
            const user = new people({
                ...req.body,
                password: hashpass,
                avater: req.file.filename
            });

            const response = await user.save();

            res.json({
                response
            });
        } else{
            const user = new people({
                ...req.body,
                password: hashpass,
            });

            const response = await user.save();

            res.json({
                response
            });
        }

    } catch(err){
        res.status(500).json({
            error: err
        })
    }
}

const editUser = async(req, res) => {
    try{
        const salt = 10;
        const hashpass = await bcrypt.hash(req.body.password, salt);

        if(req.file){
            const response = await people.findByIdAndUpdate({_id: req.params.id},
                {$set: {
                    ...req.body,
                    password: hashpass,
                    avater: req.file.filename
                    
                }
            });
            const delPath = `${__dirname}/../clint/public/userUpload/${response.avater}`
            fs.unlinkSync(delPath);

            res.json({
                response: 'update successfull',
            })
        } else{
            const response = await people.findByIdAndUpdate({_id: req.params.id},
                {$set: {
                    ...req.body,
                    password: hashpass,
                    
                }
            });
            res.json({
                response: 'update successfull',
            })
        }
        
    } catch(err){
        res.status(500).json({
            err: err.message,
        })
    }
}

const deleteUser = async (req, res) => {
    try{
        const respose = await people.findByIdAndDelete({_id: req.params.id});

        if(respose.avater){
            const delPath = `${__dirname}/../clint/public/userUpload/${respose.avater}`
            fs.unlinkSync(delPath);
        }
        res.json({
            respose,
        })

    } catch(err){
        res.status(500).json({
            err,
        })
    }
}

module.exports = {
    getUser,
    postUser,
    editUser,
    deleteUser
}
