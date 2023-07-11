const mongoose = require('mongoose');
// const DB = process.env.DATABASE;
const DB = 'mongodb://127.0.0.1/UserDatabase';


mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connection successfullY");
}).catch((err) => {
    console.log("Error No connection");
});