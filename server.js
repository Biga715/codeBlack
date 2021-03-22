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
const request = require('request');
//const { default: Home } = require('./my-app/src/Home');
//const upload = require('./upload');


app.use(cors());
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });
  app.get('/jokes/random', (req, res) => {
    request(
      { url: 'https://joke-api-strict-cors.appspot.com/jokes/random' },
      (error, response, body) => {
        if (error || response.statusCode !== 200) {
          return res.status(500).json({ type: 'error', message: err.message });
        }
  
        res.json(JSON.parse(body));
      }
    )
  });

app.get('/', (req, res) => res.send('hey!'));

//upload file
//app.post('/upload', upload);

//Connecting Socket.io
var http = require('http').createServer(app);

const io = require('socket.io')(http, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true
  }
});
io.on('connection', socket => { 
    console.log('new client connected');
    //socket.emit('connection', null);
   // socket.emit("hello", 1, "2", { 3: '4', 5: Buffer.from([6]) });
    
    socket.on("hello", (arg) => {
        console.log(arg); // world
      });

    socket.on('disconnect', () => {
        console.log('user disconnected')
      })
});


http.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`));

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
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
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
