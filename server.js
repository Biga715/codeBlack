
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
var siofu = require("socketio-file-upload");
const jsonwt = require('jsonwebtoken');
const fileupload = require('express-fileupload');

var currentUser = "";
var currentSession;

app.use(cors());
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
//for file upload
app.use(fileupload());
app.use(express.static("files"));

app.post('/upload', (req, res) => {
    const newpath = __dirname + "/resourceFiles/";
    const file = req.files.file;
    const filename = file.name;
    console.log(newpath);
    console.log(filename);
    console.log("in upload function");
    
    file.mv(`${newpath}${filename}`, (err) => {
        if(err){
            res.status(500).send({ message: "File upload failed", code: 200 });
        }
        res.status(200).send({ message: "File Uploaded", code: 200 });
        
    });
    
});


//trying to get list of files

const directory = __dirname + "/resourceFiles/";
const path = require('path');
const fs = require('fs');
app.post('/getFiles', (req, res) => {
    
    fs.readdirSync(directory).forEach(file => {
        if (fs.lstatSync(path.resolve(directory, file)).isDirectory()) {
          console.log('Directory: ' + file);
        } else {
          console.log('File: ' + file);
        }
      });
      res.send(fs.readdirSync(directory));
});


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
    res.send('hey!')
});

const verifyJWT = (req, res, next)=>{
    const token = req.headers["x-access-token"]

    if(!token){
        res.send("We need a token")
    }
    else{
        jsonwt.verify(token, "creativekey", (err, decoded)=>{
            if(err){
                res.json({ isAuth: false, msg: "failed to authenticate"})
            }
            else{
                req.userId = decoded._id;
                // console.log(req.session.user);
                next();
            }
        })
    }
}

app.get('/isUserAuth', verifyJWT, (req, res) =>{
    res.send("You are authenticated");
})
app.get('/hasSignedIn', (req, res) => {
    if(req.session.user){
        res.json({
            auth: true,
            msg: "you are signed in"
        })
    }   
    else{
        return res.json({
            auth: false,
            msg: "you are not signed in"
        })
    } 
});
// app.get('/login', (req, res) => {
    
// });
// app.get('/signup', (req, res) => {
    
// });
// app.post('/logout', (req, res) => {
    
// });



//upload file
//app.post('/upload', upload);

//Connecting Socket.io
let connectedUsers = {};
var http = require('http').createServer(app);

const io = require('socket.io')(http, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true
  }
});

//on listens
//emit sends
io.on('connection', socket => { 
    console.log('new client connected');

   var uploader = new siofu();
   uploader.dir = "/uploads";
   uploader.listen(socket);
    
   socket.on('message', ({name, message}) => {
    io.emit('message', {name, message})
   })
socket.on("hello", (arg) => {
        console.log(arg); // world
});

socket.on('disconnect2', () => {
     console.log('user disconnected')
});

    socket.on("logIn", (user) => {
        user.id = socket.id;
        connectedUsers[socket.id] = user;
        console.log(user);
        console.log("yerrrrrrr");
        socket.emit('getUser', user);
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
    var regex = new RegExp("^[a-zA-Z0-9+_.-]+@wustl.edu$");
    var emailCheck = regex.test(req.body.email);
    if(!emailCheck){
        return res.status(400).json({
            msg: "Invalid WUSTL email"
        })
    }
    if(req.body.password != req.body.confirm){
        return res.status(400).json({
            msg: "Passwords do not match."
        })
    }
    else{
        req.session.user = user._id;
        currentUser = req.body.username;
        // let webtoken = jsonwt.sign({ user_id: users.user_id}, 'creativekey');
        new_user.save(err => {
            if(err){
                return res.status(400).json({
                    msg: 'Username is already taken. Try again.'
                })
            }
            return res.status(200).json({
                msg: "You've successfully signed up and been logged in!",
                user: new_user
                // token: webtoken
                // auth: true
            })
        })
    }

});
// Adding a new profile
app.post('/addProfile', (req, res, next) => { 
    const new_user_profile = new profile({
        name: req.body.fullName,
        username: req.body.username,
        email: req.body.email,
        major: req.body.grade,
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
        let loggedInUser;
        user.findOne({ username: req.body.username}, (err, users) =>{
            loggedInUser = users;
            let webtoken = jsonwt.sign({ user_id: users.user_id}, 'creativekey');
            return res.status(200).json({
                msg: "Profile Added!",
                user: loggedInUser,
                token: webtoken
            })
        })
        
        
    })

});

app.post('/login', (req, res, next) => { 
    //if user is not found from the front end then user will be null
    let loggedInUser;
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
                req.session.user = user._id;
                loggedInUser = users;
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
                req.session.currentUser = req.body.username;
                // currentUser = req.session.currentUser;
                // console.log("current user: " + req.session.currentUser);
                console.log("session id: " + req.sessionID);
                let webtoken = jsonwt.sign({ user_id: users._id}, 'creativekey');
                return res.status(200).json({
                    msg: "You've successfully logged in!",
                    token: webtoken,
                    user: loggedInUser,
                    auth: true,
                    success: true
                })
                // return res.json(req.session);
            }else{
                return res.status(400).json({
                    msg: "Invalid Password",
                    auth: false,
                    user: loggedInUser,
                    success: false
                })
            }
        }
        
        // currentUser = req.body.username;
        // return res.status(200).json({
        //     title: 'login worked',
        //     token: webtoken,
        // })
    })
});
// Adding a new profile
app.get('/getUser', (req, res, next) => { 
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
app.post('/getProfileData', (req,res,next)=> {
    // let public = 'public';
    // console.log("session user: " + req.session.currentUser);
    let current = req.body.user;
    console.log("session id on profile: " + req.sessionID);
    //get public post
    profile.find({ username: current }, (err, profile) => {
        if(err)return console.log(err)
        console.log(profile);
        res.contentType('json');
        res.send(profile);
    })
    
})

//updateProfileData
app.post('/updateProfile', (req, res, next)=>{
    let oldUsername = req.body.oldUsername;
    let username = req.body.newUsername;
    let fullName = req.body.fullName;
    let grade = req.body.grade;
    let bio = req.body.bio;
    let skills = req.body.skills;

    if(oldUsername != username){
        user.findOne({ username: username}, (err, users) =>{
            if(users){
                return res.status(400).json({
                    msg: 'Username is already taken. Try again.'
                })
            }
            else{
                user.findOneAndUpdate({username: oldUsername}, {username: username}, (err, users)=>{
                    if(err){
                        console.log(err);
                    }
                    else{
                        console.log(users);
                    }
                })
            }
        })
    }
    
    // sessionStorage.setItem('currentUser', username);
    profile.findOneAndUpdate({username: oldUsername },  {"$set": { "username": username, "name": fullName, "major": grade, "bio": bio, "skills": skills}}, function (err, editedProfile) { 
        if (err){ 
            console.log(err) ;
            res.status(500).send(err);
        } 
        else{ 
            console.log("New Profile : ", editedProfile); 
            return res.status(200).json({
                newUser: username
            })
        } 
    }); 
})


//logout
app.get('/logout', (req,res,next)=> {
    req.session.destroy();
    console.log("session destroyed");
    res.json({
        auth: false
    })
    
})
