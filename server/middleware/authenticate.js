
// for token must using jwt to get that token and verify that is right token
const jwt = require('jsonwebtoken');

// we have generate token in our schema folder
const User = require('../model/userSchema');

const authenticate = async (req, res, next) => {
    try {
        // to get cookie from browser name of token is jwtoken
        // const token = req.cookies.jwtoken;

        // get token from headers
        const token = req.headers.token;


        // now verify that browser have token which i set by SECRET_KEY
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
        // that verityToken gets all details of that user

        // NOW USER AUTHENTICATE BUT WHAT SHOW IN PAGE know user details so,

        // finding user and checking token is valid or not
        const rootUser = await User.findOne({ _id: verifyToken._id, "tokens.token": token }); // inside tokens object value of token is token(gettingToken)
        // if user not found
        if (!rootUser) {
            // return res.staus(404).send({ message: "Please Login" });
            throw new Error('User not found');
        }

        // if user found then stored in variable , so that any page access what is details of that particular user
        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id;

        next();

    } catch (err) {
        res.status(401).send("Unauthorized user");
        // console.log(err);
    }
}

module.exports = authenticate;
