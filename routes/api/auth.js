const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const User = require('../../model/User');

const verifyJWT = (req, res, next) => {
    const token = req.headers["x-access-token"];

    if(!token) {
        res.send("Yo, we need a token please give it to us next time");
    }else{
        jwt.verify(token, "jwtSecret", (err, decoded) => {
            if(err) {
                res.json({ auth: false, message: "U failed to authenticate" });
            } else {
                req.userId = decoded.id;
                next();
            }
        })
    }
}

router.get('/isUserAuth', verifyJWT, (req, res) => {
    res.send({auth: true})
});

router.post('/login', (req, res) => {
    User.findOne({username: req.body.username, password: req.body.password})
        .sort({ date: -1 })
        .then(user => {
            const id = user._id;
            const token = jwt.sign({id}, "jwtSecret", {
                expiresIn: 300,
            });

            const details = {
                id: user._id,
                username: user.username,
                name: user.name
            };

            res.json({ auth: true, token: token, result: details});
        });
});

router.post('/register', (req, res) => {
    const newUser = User({
        username: req.body.username,
        password: req.body.password,
        name: req.body.name,
    });

    newUser.save().then(user => res.json(user));
});


module.exports = router;