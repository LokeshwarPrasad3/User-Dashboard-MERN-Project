
const mongoose = require('mongoose');

// using pre method which make hash before saving data
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// creating document structure
const userSchema = new mongoose.Schema({
    // validate name that not have space or not have less than 3 char
    name: {
        type: String,
        required: true,
        validate: {
            validator: function (name) {
                if ((name.length < 3 || !(name.trim()))) {
                    throw new Error('Name must be at least 3 characters long');
                }
            }
        }
    },
    // validate email sould be contain @ and before @ some character etc
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (email) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(email);
            },
            message: 'Invalid email address',
        },
    },
    // validate number that it have 10 to 12 digits
    phone: {
        type: Number,
        required: true,
        validate: {
            validator: function (phone) {
                const phoneString = String(phone);
                if (phoneString.length < 10 || phoneString.length > 12) {
                    throw new Error('Phone number must be between 10 and 12 digits.');
                }
            },
        },
    },
    // validate their profession that it have not spaces and less than three char
    work: {
        type: String,
        required: true,
        validate: {
            validator: function (work) {
                if (work.length < 3 || (!work.trim())) {
                    throw new Error('Work must be more than 3 character')
                }
            }
        }
    },
    image: {
        type: String,
        require: true
    },
    password: {
        type: String,
        required: true
    },
    cpassword: {
        type: String,
        required: true,
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now
    },

    messages: [
        {
            name: {
                type: String,
                required: true,
                validate: {
                    validator: function (name) {
                        if ((name.length < 3 || !(name.trim()))) {
                            throw new Error('Name must be at least 3 characters long');
                        }
                    }
                }
            },
            // validate email sould be contain @ and before @ some character etc
            email: {
                type: String,
                required: true,
                unique: true,
                validate: {
                    validator: function (email) {
                        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        return emailRegex.test(email);
                    },
                    message: 'Invalid email address',
                },
            },
            // validate number that it have 10 to 12 digits
            phone: {
                type: Number,
                required: true,
                validate: {
                    validator: function (phone) {
                        const phoneString = String(phone);
                        if (phoneString.length < 10 || phoneString.length > 12) {
                            throw new Error('Phone number must be between 10 and 12 digits.');
                        }
                    },
                },
            },
            // validate their profession that it have not spaces and less than three char
            message: {
                type: String,
                required: true,
                validate: {
                    validator: function (work) {
                        if (work.length < 3 || (!work.trim())) {
                            throw new Error('Work must be more than 3 character')
                        }
                    }
                }
            },
        }
    ]
});



// before saving userSchema ... excute that async function
// middleware always using next 
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
        this.cpassword = await bcrypt.hash(this.cpassword, 12);
    }
    next();
})


// we made methods of indivisual useSchema nameis generateAuthToken
// which defined to generating new jwt token after saving data of user
// method defines new method for userSchema
userSchema.methods.generateAuthToken = async function () {
    try {
        // jwt sign is used to generate token
        // it taking two argument ( {_id: this._id }, secret key) where this point current document
        let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY)
        // store in db . concate to ( add new object in array)
        this.tokens = await this.tokens.concat({ token: token });
        await this.save();
        return token;

    } catch (err) {
        console.log(err);
    }
}

// stored to message
userSchema.methods.addMessage = async function (name, email, phone, message) {
    try {
        this.messages = this.messages.concat({ name, email, phone, message });
        await this.save();
        return this.messages;
    } catch (err) {
        console.log(err);
    }
}

const User = new mongoose.model('User', userSchema);

module.exports = User;
