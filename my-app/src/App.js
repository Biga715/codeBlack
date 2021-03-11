import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component{
  constructor(props){
    super(props);
    this.signUp = this.signUp.bind(this);
    this.inputRef = React.createRef();
    this.showLogin = this.showLogin.bind(this);
    this.logIn = this.logIn.bind(this);
    this.showSignup = this.showSignup.bind(this);
  }

  container = React.createRef();
  state = {
    open: false,
  };

  handleButtonClick = () => {
    this.setState(state => {
      return {
        open: !state.open,
      };
    });
  };

  handleClickOutside = event => {
    if (this.container.current && !this.container.current.contains(event.target)) {
      this.setState({
        open: false,
      });
    }
  };


  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
  document.removeEventListener("mousedown", this.handleClickOutside);
  }
  
  render() {




   

    return (
      <div className="App">
        <header className="App-header">
          <div id="header">
            <h1 id="codeBlackLogo"> &lt;codeBlack/&gt;</h1>

            <div class="container" ref={this.container}>
             <button type="button" onClick={this.handleButtonClick} class="button" id="menuBtn">
              ☰
              </button>
            </div>

            {this.state.open && (
            <div class="dropdown">
              <ul>
                <li>About Us</li>
                <li>Resume Review</li>
                <li>Discussion Board</li>
                <li>Profile</li>
             </ul>
            </div>
            )}

          </div>
         
        
     
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
    );
  }

  signUp(event) {
    event.preventDefault();
    document.getElementById("signupStatus").style.display="block";
    
    let newUser = {
      username: document.getElementById("newUsername").value,
      email: document.getElementById("newEmail").value,
      password: document.getElementById("newPassword").value
    }
    console.log(newUser);

    axios.post('http://localhost:4000/signup',newUser)
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
    }, err =>{
        console.log(err.response);
        document.getElementById("signupStatus").innerText=err.response.data.msg;
    })
    // console.log(newUser);

  }

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
    console.log(user);
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

}

export default App;
//Drop down functionality is based on: https://codedaily.io/tutorials/63/Create-a-Dropdown-in-React-that-Closes-When-the-Body-is-Clicked