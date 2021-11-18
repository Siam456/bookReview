const express = require('express');
const mongoose = require('mongoose');
var cookieParser = require('cookie-parser')


const app = express();
app.use(express.json());
app.use(express.urlencoded({extended : true}))
require('dotenv').config();

//cookie parser
app.use(cookieParser(process.env.COOKIE_PARSER));


//database connection
mongoose.connect(process.env.MONGOOSE_CONNECTION_STRING,
    {   useNewUrlParser: true,
        //useCreateIndex: true,
        useUnifiedTopology: true,})
        //useFindAndModify: true })
.then(() => console.log('connection successfully'))
.catch(err => console.log(err));

const user = require('./route/user'); 
const login = require('./route/loginRoute')
const book = require('./route/bookRoute');
const review = require('./route/reviewRoute');

app.use('/user', user);
app.use('/login', login);
app.use('/book', book);
app.use('/review', review);



//chcek user profile
const checklogin = require('./middleware/common/checklogin')
app.get('/userprofile' , checklogin, (req, res) => {
    if(req.user){
        res.json({
            profile: req.user
        })
    }
})

//log out
app.get('/logout' , (req, res) => {
    res.clearCookie(process.env.COOKIE_NAME);
    res.end()
})

app.listen(process.env.PORT, ()=> {
    console.log(`server start successfully at port ${process.env.PORT}`);
})