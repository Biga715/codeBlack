import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import HomeBanner from './HomeBanner';
import LogIn from './LogIn';
import SignUp from './SignUp';
import Nav from './Nav';
import Discussion from './Discussion';
import Home from './Home';
import socketClient  from "socket.io-client";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const SERVER = "http://localhost:3000";
var socket = socketClient(SERVER);

class App extends Component {

  

  constructor(props) {
    super(props);
    /*this.signUp = this.signUp.bind(this);
    this.inputRef = React.createRef();
    this.showLogin = this.showLogin.bind(this);
    this.logIn = this.logIn.bind(this);
    this.showSignup = this.showSignup.bind(this);*/
  }

  /*

  container = React.createRef();
  containerP = React.createRef();

  state = {
    openMenu: false,
    openProfile: false,
  };





  handleButtonClick = () => {
    this.setState(state => {
      return {
        openMenu: !state.openMenu,
      };
    });
  };

  handleClickOutside = event => {
    if (this.container.current && !this.container.current.contains(event.target)) {
      console.log(this.container.current);
      console.log(event.target);
      
      
      this.setState({
        openMenu: false,
      });
    }
  };




  handleButtonClickProfile = () => {
    this.setState(state => {
      return {
        openProfile: !state.openProfile,
      };
    });
  };

  
  handleClickOutsideProfile = event => {
    if (this.containerP.current && !this.containerP.current.contains(event.target)) {
      
   
      this.setState({
        openProfile: false,
      });
    }
  };
  



  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
    document.addEventListener("mousedown", this.handleClickOutsideProfile);
  }

  componentWillUnmount() {
  document.removeEventListener("mousedown", this.handleClickOutside);
  document.removeEventListener("mousedown", this.handleClickOutsideProfile);
  }
  */

// sending sockets
send = () => {
  var socket = socketClient(SERVER);
  console.log(`I'm connected with the back-end`);
  alert("working")
}
/*sendButton = () => {
  var socket = socketClient(SERVER);
  console.log(`I'm connected with the back-end`);
  alert("sent!")
}*/


  render() {
    

   /* socket.on('connection', () => {
      console.log(`I'm connected with the back-end`);
      alert("working")
    });*/
    

    return (
      
      <Router>
        <div className="App">
          <Nav></Nav>
          <Switch>
            <Route path="/" exact component={Home}></Route>
            <Route path="/discussion" component={Discussion}></Route>
            <Route path="/signUp" component={SignUp}></Route>
            <Route path="/logIn" component={LogIn}></Route>
          </Switch>
          

        </div>
      </Router>


      /*
       <div className="App">
         <header className="App-header">
           
         {/*
           <div id="header">
             <h1 id="codeBlackLogo"> &lt;codeBlack/&gt;</h1>
           <Router>
             <div className="container" ref={this.container}>
              <button type="button" onClick={this.handleButtonClick} class="button" id="menuBtn">
               ☰
               </button>
 
               {this.state.openMenu && (
             <div className="dropdown">
               <ul>
                 
                 
                 <li>About Us</li>
                 <Link to="/signUp">
                 <li> Resume Review </li>
                 </Link> 
                 <li>Discussion Board</li>
                 <li>Profile</li>
                 
              </ul>
             </div>
             )}
             </div>
 
 
           
          
           <Switch>
           <Route path="/signUp" component={SignUp} />
           <Route path="/logIn" component={LogIn} />
           </Switch>
                
             <div className="container" ref={this.containerP}>
              <button type="button" onClick={this.handleButtonClickProfile} class="button" id="profileBtn">
              👤
 
               </button>
 
 
               {this.state.openProfile && (
             <div className="dropdown" id="profileDrop">
               <ul>
         
                 
                 <Link to="/signUp">
                 <li >Sign Up</li>
                 </Link>
 
                 
 
                 
                 <li > <Link to="/logIn"> Log In </Link>
                 </li>
                 
                 
              </ul>
             </div>
             
             )}
             </div>
             
 
             </Router>
 
           
 
           </div>
               
         <Nav></Nav>
           
 
         <div id= "mainP">
           <HomeBanner/>
           <form>
           Username: <input type="text" id="username"/>&nbsp;
           Email: <input type="text" id="email"/>&nbsp;
           Password: <input type="password" id="password"/>&nbsp;
           <button onClick={this.signUp}>Sign Up</button><br/>
         </form>
         </div>
         
         </header>
         
       </div>
             */

        
     /*
          <h1 id="signupTitle">Sign Up for an Account</h1>
          <form id ="signup">
            Username: <input type="text" id="newUsername"/>&nbsp;
            Email: <input type="text" id="newEmail"/>&nbsp;
            Password: <input type="password" id="newPassword"/>&nbsp;
            <button onClick={this.signUp}>Sign Up</button><br/>
          </form>
          <h1 id="loginTitle">Log In</h1>
          <form id="login">
            Username: <input type="text" id="username"/>&nbsp;
            Password: <input type="password" id="password"/>&nbsp;
            <button onClick={this.logIn}>Log In</button><br/>
          </form>
          <p id ="signupStatus"></p>
          <p id="needToSignup">Need an account? <button onClick={this.showSignup}>Sign Up</button></p>
          <p id="needToLogin">Already have an account? <button onClick={this.showLogin}>Log In</button></p>
        </header>
        
      </div>
      */
    );
    

  }

/*
  signUp(event) {
    event.preventDefault();

    /*document.getElementById("signupStatus").style.display="block";
    
    let newUser = {
      username: document.getElementById("newUsername").value,
      email: document.getElementById("newEmail").value,
      password: document.getElementById("newPassword").value
    }
    console.log(newUser);

    axios.post('http://localhost:4000/signup', newUser)
      .then(res => {
        console.log(res);
        document.getElementById("signupStatus").innerText=res.data.msg;
        this.error = '';
        
        document.getElementById("needToLogin").style.display="none";
        document.getElementById("signupTitle").style.display="none";
        document.getElementById("signup").style.display="none";
        document.getElementById("loginTitle").style.display="block";
        document.getElementById("login").style.display="block";
        document.getElementById("needToSignup").style.display="block";
        // this.$router.push('/login');
      }, err => {
        console.log(err.response);
        document.getElementById("signupStatus").innerText=err.response.data.msg;
    })
    // console.log(newUser);

  }
  */
/*
  showLogin(){
    document.getElementById("needToLogin").style.display="none";
    document.getElementById("signupTitle").style.display="none";
    document.getElementById("signup").style.display="none";
    document.getElementById("signupStatus").style.display="none";
    document.getElementById("loginTitle").style.display="block";
    document.getElementById("login").style.display="block";
    document.getElementById("needToSignup").style.display="block";
  }
  
  logIn(event){
    event.preventDefault();
    let user = {
      username: document.getElementById("username").value,
      password: document.getElementById("password").value
    }
    axios.post('http://localhost:4000/login', user)
    .then(res => {
        // console.log(res);
        //if it works
        if(res.status === 200){
            console.log(res.data.msg)
            // localStorage.setItem('token', res.data.token);
            // document.getElementById("status").innerText=res.data.msg;
            // this.$router.push('/home');
        }
    }, err => {
        this.error = err.response.data.msg;
        console.log(this.error);
        // console.log(err);
        // document.getElementById("status").innerText=err.response.data.msg;
    })
  }

  showSignup(){
    document.getElementById("needToLogin").style.display="block";
    document.getElementById("signupTitle").style.display="block";
    document.getElementById("signup").style.display="block";
    document.getElementById("signupStatus").style.display="none";
    document.getElementById("loginTitle").style.display="none";
    document.getElementById("login").style.display="none";
    document.getElementById("needToSignup").style.display="none";
  }
  */

}

export default App;
//Drop down functionality is based on: https://codedaily.io/tutorials/63/Create-a-Dropdown-in-React-that-Closes-When-the-Body-is-Clicked