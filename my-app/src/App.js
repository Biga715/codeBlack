import React, { Component, useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import HomeBanner from './HomeBanner';
import LogIn from './LogIn';
import SignUp from './SignUp';
import Nav from './Nav';
import Discussion from './Discussion';
import Home from './Home';
import Profile from './Profile';
import socketClient  from "socket.io-client";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {Button, Form, FormGroup, Label, Input}from 'reactstrap';
import {FacebookLoginButton} from 'react-social-login-buttons';

const SERVER = "http://localhost:4000";
var socket = socketClient(SERVER);
socket.emit("hello", "world");
/*

        <Route path="/" exact component={Home}></Route>
        <Route path="/discussion" component={Discussion}></Route>
        <Route path="/signUp" component={SignUp}></Route>
        <Route path="/logIn" component={LogIn}></Route>

              <Switch>

      </Switch>

socket.on("hello", (arg1, arg2, arg3) => {
  console.log(arg1); // 1
  console.log(arg2); // "2"
  console.log(arg3); // { 3: '4', 5: ArrayBuffer (1) [ 6 ] }
  
});*/
/*
const [state, setState] = useState({message: '', name: ''});
const [chat, setChat] = useState([]);




useEffect(() => {
  socket.on('message', ({name, message}) => {
    setChat([...chat, {name, message}])
  })
})

const onMessageSubmit = (e) => {
  e.preventDefault();
  const [name, message] = state;
  socket.emit('message', {name, message});
  setState({message: '', name});
}

const onTextChange = e => {
  setState({...state, [e.target.name]: e.target.value })
}

const renderChat = () => {
  return chat.map(({name, message}, index) =>(
    <div key={index}>
      {name}: {message}
    </div>
  ))
}


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

          <form onSubmit={onMessageSubmit}>
            <input type="text" name="message" value={state.message} label="message" onChange={e => onTextChange(e)} ></input>
            <input type="submit">Send</input>
          </form>

          <div>
            {renderChat()}
          </div>
        </div>
      </Router>

    );
  }
}
*/

function App(){
const [state, setState] = useState({message: '', name: ''});
const [chat, setChat] = useState([]);

const send = () => {
  var socket = socketClient(SERVER);
  console.log(`I'm connected with the back-end`);
  alert("working")
  console.log(SERVER);
}

useEffect(() => {
  console.log("useEffect")
  socket.on('message', ({name, message}) => {
    setChat([...chat, {name, message}])
  })
})

const onMessageSubmit = (e) => {
  e.preventDefault();
  console.log("hey");
  const {name, message} = state;
  socket.emit('message', {name, message});
  setState({message: '', name});
  console.log(state);
}

const onTextChange = (e) => {
  setState({...state, [e.target.name]: e.target.value })
}
/*
const renderChat = () => {
  console.log("render chat");
  console.log(chat);
  return chat.map(({ name, message}, index) =>(
    <div key={index}>
       {name}: {message}
    </div>
  ))
}
*/
/*
      <div id="renderChat">
        {renderChat()}
      </div>
      */


return (
      
  <Router>
    <div className="App">
      <Nav></Nav>
      <Route path="/" exact component={Home}></Route>
      <Route path="/discussion" component={Discussion}></Route>
      <Route path="/signUp" component={SignUp}></Route>
      <Route path="/logIn" component={LogIn}></Route>
      <Route path="/profile" component={Profile}></Route>
    </div>
  </Router>

);
}

export default App;
//Drop down functionality is based on: https://codedaily.io/tutorials/63/Create-a-Dropdown-in-React-that-Closes-When-the-Body-is-Clicked