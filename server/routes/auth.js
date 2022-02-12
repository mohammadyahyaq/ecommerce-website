// This document will contains all the necessery routes for authentication
const mongoose = require('mongoose');
const User = mongoose.model('User');  //import the user model

module.exports = (app, passport) => {
    // console.log(passport);
    app.post('/api/auth/login', (req, res) => {
        // console.log(req);
        const user = new User({
            email: req.body.email,
            password: req.body.password
        })

        // console.log(user);

        req.login(user, err => {
            console.log('entered the function');
            if (err) {
                console.log('got error in the login');
                res.status(400);
                // console.log('The error is: \n' + err);
                res.json({ message: err.toString() })
            } else {
                passport.authenticate('local')(req, res, () => {
                    res.status(200);
                    res.json(req.user);
                });
            }
        });
    });

    app.post('/api/auth/register', (req, res) => {
        // console.log(req.body);
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;

        console.log(name + " " + email + " " + password);

        User.register(new User({ name: name, email: email, role: 'regular' }), password, (err, User) => {
            if (err) {
                console.log(err);
                res.status(400);
                res.json({ message: err.toString() })
            } else {
                // when registered successfully login automatically
                passport.authenticate('local')(req, res, () => {
                    console.log('the user is regestered correctly');
                    console.log("the user is: " + req.user);
                    res.status(200);
                    res.json(req.user);
                });
            }
        });
    });

    app.get('/api/auth/logout', (req, res) => {
        req.logOut();
        res.json({ message: 'logout successful' });
    });

    app.get('/api/auth/user', (req, res) => {
        console.log(req.user);
        res.json(req.user ? req.user : false);
    });
}