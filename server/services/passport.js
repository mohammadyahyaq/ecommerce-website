// console.log('This file is correctly imported!!!');
const mongoose = require('mongoose');

const passport = require('passport');

const User = mongoose.model('User');  //import the user model
// console.log(User);

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

module.exports = passport; // this is the passport with all the necessery middlewares