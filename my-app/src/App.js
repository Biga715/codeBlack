import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component{
  constructor(props){
    super(props);
    this.signUp = this.signUp.bind(this);
  }
  
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            codeBlack React App
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <form>
          Username: <input type="text" id="username"/>&nbsp;
          Email: <input type="text" id="email"/>&nbsp;
          Password: <input type="password" id="password"/>&nbsp;
          <button onClick={this.signUp}>Sign Up</button><br/>
        </form>
        <p id ="status"></p>
        </header>
        
      </div>
    );
  }

  signUp(event) {
    event.preventDefault();
    
    let newUser = {
      username: document.getElementById("username").value,
      email: document.getElementById("email").value,
      password: document.getElementById("password").value
    }
    console.log(newUser);

    axios.post('http://localhost:4000/signup',newUser)
    .then(res => {
        console.log(res);
        document.getElementById("status").innerText=res.data.msg;
        this.error = '';
        // this.$router.push('/login');
    }, err =>{
        console.log(err.response);
        document.getElementById("status").innerText=err.response.data.msg;
    })
    // console.log(newUser);

  }
  
}

export default App;
