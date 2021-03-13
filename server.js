const express = require('express');
const app = express();
const mongoose = require('mongoose');
const {PORT, mongoUri } = require('./config');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const user = require('./models/users');
const { profile } = require('console');

app.use(cors());
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

// Testing to see if server is connected
app.get('/', (req, res) => res.send('Hello World!!'));

app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`));

// Connecting to MongoDB database
mongoose
.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
.then(() => console.log('MongoDB database Connected...'))
.catch((err) => console.log(err))

// Signing up a user
app.post('/signup', (req, res, next) => { 
    const new_user = new user({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    console.log(new_user);
    new_user.save(err => {
        if(err){
            return res.status(400).json({
                msg: 'Username is already taken. Try again.'
            })
        }
        return res.status(200).json({
            msg: "You've successfully signed up!"
        })
    })

});
// Creating Profile
app.post('/profile', (req, res, next) => { 
    const new_profile = new profile({
        username: req.body.username,
        bio: req.body.bio,
        year: req.body.year,
        major: req.body.major,
        skills: req.body.skills
    })
    console.log(new_profile);
    new_profile.save(err => {
        if(err){
            return res.status(400).json({
                msg: 'A profile has already been created.'
            })
        }
        return res.status(200).json({
            msg: "You've successfully created a profile!"
        })
    })

});
