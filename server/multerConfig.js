

// using for files storing in mongodb
const multer = require('multer');

// Storage and fileName setting which is upload
const storage = multer.diskStorage({
    // where to upload photos
    destination: (req, file, cb) => {
        cb(null, 'Images/'); // Destination folder
    },
    filename: (req, file, callBack) => {
        // if not error then give original name
        // callBack(null, Date.now() + '-' + file.originalname);
        callBack(null, file.originalname)
    }
})

// here multer have object and stored that in upload (main storage)
let upload = multer({
    storage: storage
})

// exports upload
module.exports = upload;