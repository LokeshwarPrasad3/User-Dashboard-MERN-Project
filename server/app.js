
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
// using .env for hidding confidential keys
const dotenv = require('dotenv');
const cors = require('cors');

// FOR IMAGES SIZE LARGER ISSUE 
// Add body-parser middleware
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

// const path = require('path');
// Your route handlers...

// configure path of .env file
dotenv.config({ path: './config.env' });

// cookie setting in browser need module
const cookieParser = require('cookie-parser');

// and we need to tell that using that in express
app.use(cookieParser());


// using PORT number in .env file
const port = process.env.PORT || 5000;

// use cors
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    // optional
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'token'], // Add 'token' header to allowed headers
}));


// requiring created connectin 
require('./db/conn');
// requiring schema , models
// const User = require('./model/userSchema');

// app.use(express.static(__dirname + './Frontend/build'));
// using build
// app.use(express.static(path.join(__dirname, './Frontend/build')));


// using that for getting data form of json
app.use(express.json());

// Add this code before defining your routes
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));



// link to router file which have login , register, authenticate user
app.use(require('./router/auth'));


// Middleware that authenticate user



// app.get('/about', middleware, (req, res) => {
//     // console.log("I am middle ware check");
//     res.send("My page is about");
// })

// app.get('/contact', (req, res) => {
//     // res.cookie("TEst", 'lokeshwar');
//     res.send("Hello contact page");
// })

app.get('/signup', (req, res) => {
    res.send("Sign Up Page");
})

app.get('/signin', (req, res) => {
    res.send("Sign in Page");
})

app.listen(port, () => {
    console.log(`App listening port : ${port}`);
})