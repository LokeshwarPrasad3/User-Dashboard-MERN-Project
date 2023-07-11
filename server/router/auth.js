
const express = require('express');
// using router for better experience
const router = express.Router();
// using bcrypt to hash password two method .hash .campare
const bcrypt = require('bcrypt');
// using for token in browser
const jwt = require('jsonwebtoken');

const authenticate = require('../middleware/authenticate');


// requiring connection of db
require("../db/conn");
// requiring schema , model (collections) of db
const User = require('../model/userSchema');

// get method for home page
router.get('/', (req, res) => {
    res.send("Hello world from Router js");
})


// DEFINING POST METHOS Register , Login User
// REGISTER USER using async await methods
router.post("/register", async (req, res) => {

    // getting data from user /register page , storing in certan variable destructing methods
    const { name, email, phone, work, password, cpassword, base64 } = req.body;

    // Check if image upload was successful
    // if (!req.file) {
    //     return res.status(400).json({ message: "Image upload failed" });
    // }
    // get image from request
    // const image = req.file.filename;


    // if any one is empty then returning message
    if (!name || !email || !phone || !work || !password || !cpassword || !base64) {
        // (client error) Missing required parameter bad request 400
        return res.status(400).json({ message: "All field is Required" })
    }

    // checking all type of validation for authenticate user
    try {



        // for image
        // Images.create({image:base64});

        // validation method for email
        const emailRegex = new RegExp('^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$');

        // finding email which duplicate or not
        const userLogin = await User.findOne({ email: email });
        if (userLogin) {
            // un processable entity (from server ) 422 : duplicate data entered
            return res.status(422).json({ message: "Email address is already in use!" });
        }

        // validate name that not have less than 3 letter
        // trim() return false when all have spaces
        else if ((name.length < 3 || (!name.trim()))) {
            // (client error) validation check 400
            return res.status(400).json({ message: "Name Must Be at least 3 Characters Long" });
        }

        // validate name that not have less than 3 letter
        // trim() return false when all have spaces
        if (work.length < 3 || (!work.trim())) {
            // (client error) validation check 400
            return res.status(400).json({ message: "Work must be more than 3 character" })
        }

        // checking email must have @ using emailRegex
        else if (!emailRegex.test(email)) {
            // (client error) validation check 400
            return res.status(400).json({ message: "Invalid email format" });
        }

        // validate Valid Phone Number
        else if (isNaN(phone) || phone.toString().length < 10 || phone.toString().length > 12) {
            // (client error) validation check 400
            return res.status(400).json({ message: "Invalid Phone number" });
        }

        // passoword should match confirm password
        else if (password !== cpassword) {
            // (client error) validation check 400
            return res.status(400).json({ message: "Passwords do not Match" });
        }

        else {
            // if all details is validate then storing to db
            // making new model storing user details
            const user = new User({ name, email, phone, work, password, cpassword, image: base64 });
            // save details to dataBAse
            await user.save();
            // send message user to done 
            res.status(201).json({ message: "User Registered Successfully", status: 201 });
        }
        // if occur any error 

        // WE CAN ALSO MAKE CAPTCHE CODE

    } catch (err) {
        console.log('Server Error Occur' + err);
    }
})

// LOGIN USER using async await methods
router.post("/login", async (req, res) => {
    try {
        let token;
        // getting login email , password
        const { email, password } = req.body;
        console.log(email);
        console.log(password);
        // check email password is not blank (missing required parameter 400)
        if (!email || !password) {
            return res.status(400).json({ message: "Please fill in all fields" });
        }
        // user is exist or not
        const userLogin = await User.findOne({ email: email }); // return null when not found

        // if user is not exist then retuern 404 not found
        if (!userLogin) {
            // till line all right
            console.log("User not found")
            res.status(404).json({ message: "Invalid Email or Password " });
        }

        // if user is exit then check all validation
        // matching password to db
        const isMatch = await bcrypt.compare(userLogin.password, password);

        //    if matched then set cookie and give output message
        if (!isMatch) {

            // get token made by userSchema file
            // we make generateAuthToken() function of userSchema indivisual documents
            token = await userLogin.generateAuthToken();
            console.log("token is " + token);


            // set token to cookie
            // arguments (nameCookie, cookieValue, object of expired)
            // res.cookie("jwtoken", token);


            // we give response to frontend so that it set token in cookie
            // giving user 200 status code that successfully login
            res.status(200).json({ message: "Successfully Logged In", token: token });
        }
        else {
            res.status(404).json({ message: "Invalid Email or Password" });
        }

    } catch (err) {
        console.log("Error occurred during login:");
        console.log(err);
        return res.status(500).json({ message: "Poor Internet Connection" });
    }
})

// LOGIN USER using async await methods
router.get('/about', authenticate, (req, res) => {

    // we send all the data of user , can anyOne requirest and find that
    // if middleware cannot return right response then it cannot read below line
    // it direclty response to page
    // showing all details
    return res.send(req.rootUser);
})

// for all data
router.get('/getData', authenticate, (req, res) => {
    return res.send(req.rootUser);
})

router.post('/contact', authenticate, async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;

        // data is not be empty
        if (!name || !email || !phone || !message) {
            console.log("Error in contact form");
            return res.status(400).json({ message: "All field is Required" })
        }

        // finding user so that add in db
        const userContact = await User.findOne({ _id: req.userID });

        // if user find
        if (userContact) {
            // we have addMessage function declared in userSchema which give format of prepared userMessage data
            // addMessage is simply concate that particular message with all message and save it
            const userMessage = await userContact.addMessage(name, email, phone, message);
            await userContact.save();
            res.status(201).json({ message: "Message send Successfully" });
        }

    } catch (err) {
        console.log(err);
    }

})


// logut USER using async await methods
router.get('/logout', (req, res) => {
    // we send all the data of user , can anyOne requirest and find that
    // if middleware cannot return right response then it cannot read below line
    // it direclty response to page
    // showing all details
    // console.log(":Hellow my logut page");
    // we need to clear cookie then clear user data in browser 
    res.clearCookie('jwtoken', { path: '/' });
    res.status(200).send(req.rootUser);
})

module.exports = router;