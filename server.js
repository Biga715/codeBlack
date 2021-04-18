const express = require('express');
const app = express();
const mongoose = require('mongoose');
const {PORT, mongoUri } = require('./config');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const user = require('./models/users');
const profile = require('./models/profile');
// const { profile } = require('console');
const request = require('request');
//const { default: Home } = require('./my-app/src/Home');
//const upload = require('./upload');

var currentUser = "";
var currentSession;

app.use(cors());
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

// const connection = mongoose.createConnection(mongoUri, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false
// });

const sessionStore = new MongoStore({
    mongoUrl: 'mongodb+srv://admin:adminUser@cluster0.lzoai.mongodb.net/codeBlack?retryWrites=true&w=majority',
    collection: 'sessions'
})
app.use(session({
    name: 'sid',
    resave: false,
    saveUninitialized: false,
    secret: 'secret-key',
    cookie: { 
        maxAge: 1000 * 60 * 60 * 24,
        // sameSite: true
    },
    store: sessionStore
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

app.get('/', (req, res) => {
    console.log(req.sessionID);
    res.send('hey!')
});
app.get('/profile', (req, res) => {
    console.log(req.sessionID)
    
});
app.get('/login', (req, res) => {
    
});
app.get('/signup', (req, res) => {
    
});
app.post('/logout', (req, res) => {
    
});



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
    
   socket.on('message', ({name, message}) => {
    io.emit('message', {name, message})
   })
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
    if(req.body.password != req.body.confirm){
        return res.status(400).json({
            msg: "Passwords do not match."
        })
    }
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
// Adding a new profile
app.post('/addProfile', (req, res, next) => { 
    const new_user_profile = new profile({
        name: req.body.fullName,
        username: req.body.username,
        email: req.body.email,
        major: req.body.major,
        year: req.body.grade,
        bio: req.body.bio,
        skills: req.body.skills
    })
    console.log(new_user_profile);
    new_user_profile.save(err => {
        if(err){
            return res.status(400).json({
                msg: 'Something is wrong'
            })
        }
        return res.status(200).json({
            msg: "Profile Added!"
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
                // currentUser = req.body.username;
                console.log("current user:" + currentUser);
                // mongoUri.collection('sessions').findOne({_id: req.sessionID}, (err, results) =>{
                //     if(err){
                //         return res.status(500).json({
                //             msg: "something went wrong",
                //             success: false
                //         })
                //     }
                //     else{
                //         console.log("successsss");
                //     }
                // });
                // req.session.currentUser = req.body.username;
                // currentUser = req.session.currentUser;
                // console.log("current user: " + req.session.currentUser);
                console.log("session id: " + req.sessionID);
                return res.status(200).json({
                    msg: "You've successfully logged in!",
                    success: true
                })
                // return res.json(req.session);
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
// Adding a new profile
app.post('/getCurrentUser', (req, res, next) => { 
    let data = {
        currentuser: currentUser
    };
    return data;

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

//get profile data
app.get('/getProfileData', (req,res,next)=> {
    // let public = 'public';
    // console.log("session user: " + req.session.currentUser);
    console.log("session id on profile: " + req.sessionID);
    //get public post
    profile.find({ username: currentUser }, (err, profile) => {
        if(err)return console.log(err)
        console.log(profile);
        res.contentType('json');
        res.send(profile);
    })
    
})

//logout
app.get('/logout', (req,res,next)=> {
    // currentUser = "";
    if (currentUser == ""){
        return res.status(400).json({
            msg: 'Not logged in.'
        })
    }
    else{
        currentUser = ""
        return res.status(200).json({
            msg: "Successfully logged out"
        })
    }
    
})
