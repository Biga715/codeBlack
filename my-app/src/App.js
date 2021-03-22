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

const SERVER = "http://localhost:4000";
var socket = socketClient(SERVER);
socket.emit("hello", "world");
/*socket.on("hello", (arg1, arg2, arg3) => {
  console.log(arg1); // 1
  console.log(arg2); // "2"
  console.log(arg3); // { 3: '4', 5: ArrayBuffer (1) [ 6 ] }
  
});*/
class App extends Component {

  constructor(props) {
    super(props);
  }


// sending sockets
send = () => {
  var socket = socketClient(SERVER);
  console.log(`I'm connected with the back-end`);
  alert("working")
  console.log(SERVER);
}


  render() {

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
          <button onClick={this.send}  id="attachBtn"> testing</button>

        </div>
      </Router>

    );
  }
}

export default App;
//Drop down functionality is based on: https://codedaily.io/tutorials/63/Create-a-Dropdown-in-React-that-Closes-When-the-Body-is-Clicked