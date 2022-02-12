const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

let validateEmail = (email) => {
    let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

let validateName = (name) => {
    // varify that the password is at least 8 characters, there is at least one uppercase, lowercase letter, and number
    let re = /^[a-z ,.'-]+\s[a-z ,.'-]+$/i;
    return re.test(name);
}

let validatePassword = (password) => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return re.test(password);
}

// create the user schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        validate: validateName
    },
    email: {
        type: String,
        validate: validateEmail
    },
    password: {
        type: String,
        validate: validatePassword
    },
    role: {
        type: String,
        enum: ['admin', 'regular']
    }
});

userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });

mongoose.model('User', userSchema); // create the user model