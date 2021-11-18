const conversationModel = require('../model/conversationModel');
const user = require('../model/userModel')

const getConversation = async (req, res) => {
    try{
        const response = await conversationModel.find({});
        if(response){
            res.json({
                response,
            })
        } else{
            res.status(404).json({
                errors: 'not found',
            })
        }

    } catch(err){
        res.status(500).json({
            errors: err.message,
        })
    }
}

const createConversation = async (req, res) => {
    //console.log(req.body);
    //console.log(req.user);
    try{
        const check = await conversationModel.find({
            $and: [
                {'creator.id': req.user._id},
                {participent: req.body.id}
            ]
        })
        const check1 = await conversationModel.find({
            $and: [
                {'creator.id': req.body.id},
                {participent: req.user._id}
            ]
        })
        if(check.length !== 0 || check1.length !== 0){
            res.json({
                msg: 'already in conversation',
            })
        } else{
            const p = await user.findOne({_id: req.body.id})
            //console.log(p)
            const conversation = new conversationModel({
                creator: {
                    id: req.user._id,
                    username: req.user.username,
                    phone: req.user.phone,
                    email: req.user.email,
                    avatar: req.user.avater,
                    role: req.user.role,
                },
                participent: {
                    id: p._id,
                    username: p.username,
                    email: p.email,
                    phone: p.phone,
                    avater: p.avater,
                    role: p.role,
                },
            });
    
            const response = await conversation.save();
            res.json({
                response,
            })
        }     

    } catch(err){
        res.status(500).json({
            errors: err.message,
        })
    }
}

const deleteConversation = async (req, res) => {
    try{
        //console.log(req.params.id)
        const response = await conversationModel.findByIdAndDelete({_id: req.params.id})
        res.json({
            response,
        })

    } catch(err){
        res.status(500).json({
            errors: err.message,
        })
    }
}

module.exports = { createConversation, getConversation, deleteConversation };