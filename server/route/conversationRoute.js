const express = require('express');

const route = express.Router();

const  { createConversation, getConversation, deleteConversation } = require('../controller/conversationController');
const checklogin = require('../middleware/common/checklogin');

route.get('/', checklogin, getConversation);
route.post('/', checklogin, createConversation);
route.delete('/:id', checklogin, deleteConversation);

module.exports = route;
