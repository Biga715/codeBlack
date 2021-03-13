const express = require('express');
const app = express();
const mongoose = require('mongoose');
const {PORT, mongoUri } = require('./config');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
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

app.post('/login', (req, res, next) => { 
    //if user is not found from the front end then user will be null
    user.findOne({ username: req.body.username}, (err, users) =>{
        if(err) {
            return res.status(500).json({
                msg: "There was an error with the server :(",
                success: false
            })
        }
        // console.log(users);
        
        if(!users){
            return res.status(401).json({
                msg: "Username was not found",
                success: false
            })
        }
        else{
            let check= bcrypt.compareSync(req.body.password, users.password);
            console.log("Password Check: " + check);
            if (check){
                return res.status(200).json({
                    msg: "Valid Password",
                    success: true
                })
            }else{
                return res.status(400).json({
                    msg: "Invalid Password",
                    success: false
                })
            }
        }
        
        // currentUser = req.body.username;
        // let webtoken = jsonwt.sign({ user_id: users.user_id}, 'creativekey');
        // return res.status(200).json({
        //     title: 'login worked',
        //     token: webtoken,
        // })
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
