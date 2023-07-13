
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
// using .env for hidding confidential keys
const dotenv = require('dotenv');
// require cors
const cors = require('cors');
// cookie setting in browser need module
const cookieParser = require('cookie-parser');

const path = require('path');

// FOR IMAGES SIZE LARGER ISSUE 
// Add body-parser middleware
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));



// and we need to tell that using that in express
app.use(cookieParser());


// configure path of .env file
dotenv.config({ path: './config.env' });

// using PORT number in .env file
const port = process.env.PORT || 5000;


// use cors
// app.use(cors());
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'token'], // Add 'token' header to allowed headers
    credentials: true,
}));



// Your route handlers...




// requiring created connectin 
require('./db/conn');
// requiring schema , models
// const User = require('./model/userSchema');

// using build
app.use(express.static(path.join(__dirname, './Frontend/build')));

// using that for getting data form of json
app.use(express.json());

// Add this code before defining your routes
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));



// link to router file which have login , register, authenticate user
app.use(require('./router/auth'));

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "./Frontend/build"));
})

app.listen(port, () => {
    console.log(`App listening port : ${port}`);
})