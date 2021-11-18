const express = require('express')

const route = express.Router();
const { getlogin, postLogin } = require('../controller/loginCotroller')

route.get('/', getlogin);

route.post('/', postLogin);

module.exports = route;