import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component() {
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
        </header>
        <form>
          Username: <input type="text" id="username"/>
          Email: <input type="text" id="email"/>
          Password: <input type="password" id="password"/>&nbsp;
          <button onClick={this.signUp}>Sign Up</button><br/>
        </form>
      </div>
    );
  }

  signUp(event) {
    event.preventDefault();
    
    var data = {
      username: document.getElementById("username"),
      email: document.getElementById("email"),
      password: document.getElementById("password")
    }
    console.log(data);

    // Initalize AJAX Request
    var xhttp2 = new XMLHttpRequest();
    // const self = this;
    // Response handler
    xhttp2.onreadystatechange = function() {


        // Wait for readyState = 4 & 200 response
        if (this.readyState === 4 && this.status === 200) {

            // parse JSON response
            var user = JSON.parse(this.responseText);
            // self.setState({todos: [...self.state.todos, todo]});

            // render(todo);

        } else if (this.readyState === 4) {

            // this.status !== 200, error from server
            console.log(this.responseText);

        }
    };

    xhttp2.open("POST", "http://localhost:3000/signup", true);

    xhttp2.setRequestHeader("Content-type", "application/json");
    xhttp2.send(JSON.stringify(data));
    
    // self.setState({input: ""});
  }
  
}

export default App;
