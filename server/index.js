require('dotenv').config(); // import all the enviroment variables

const express = require('express');
const app = express(); // This app will handle all the http requests


// set up the basic middlewares for express
app.use(express.static(__dirname + './public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Establishing the MongoDB connection
const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/EcommerceDB", { useNewUrlParser: true });

// create all the necessery models models
require('./models/User');
require('./models/Product');

// set up passport
const passport = require('./services/passport');

const session = require('express-session');

// set up the mongoose middlewares
app.use(session({
    secret: process.env.COOKIE_KEY,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize()); // to start using passport for authintication
app.use(passport.session());


// require('./routes/app')(app);
require('./routes/auth')(app, passport);
require('./routes/products')(app);

app.listen(5000, () => {
    console.log('The server now is listening at port 5000...')
});