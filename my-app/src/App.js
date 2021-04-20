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
import Resources from './Resources';
import EditProfile from './EditProfile';
import socketClient  from "socket.io-client";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {Button, Form, FormGroup, Label, Input}  from 'reactstrap';
import {FacebookLoginButton} from 'react-social-login-buttons';
import Routes from './Routes';
import AuthApi from './AuthApi';
import hasSignedIn from './checkSignin';

const SERVER = "http://localhost:4000";
var socket = socketClient(SERVER);
socket.emit("hello", "world");


const TypeWriter = function(txtElement, words, wait = 3000){
  this.txtElement = txtElement;
  this.words = words;
  this.txt = '';
  this.wordIndex = 0;
  this.wait = parseInt(wait, 10);
  this.type();
  this.isDeleting = false;
  this.counter = 0;
  this.stop = false;
}

//Type method
TypeWriter.prototype.type = function(){
  //Current index of word
    const current = this.wordIndex% this.words.length;
    //Get full text of current word
    const fullTxt = this.words[current];
    //Check if deleting
    if(this.isDeleting && !this.stop){
      //Remove char
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    }
    else{
      //Add char
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }
    //Insert txt into element
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;
      //Inital Type Speed
      let typeSpeed = 300;
      if(this.isDeleting){
        typeSpeed /= 2;
      }
      //Is word is complete
      if(!this.isDeleting && this.txt === fullTxt){
        //Make pause at end
        typeSpeed = this.wait;
        //Set delete to true
        this.isDeleting = true;
        this.counter++;
        if(this.counter === 2) {
          console.log("Second iteration is done!");
          this.stop = true;
        }
      }
      console.log(this.counter);
      if(this.isDeleting && this.txt === ''){
        this.isDeleting = false;
        //Move to the next word
        this.wordIndex++
        //Pause before start typing
        typeSpeed = 500;
      }
      // else if(this.txt === fullTxt && this.counter > 2){
      //   //I want it to end here;
      //   typeSpeed = 10000000;
      // }
  
    
    setTimeout(() => this.type(), typeSpeed);
  

}

//Init On DOM Load
document.addEventListener('DOMContentLoaded', init);

//InitApp
function init(){
  const txtElement = document.querySelector('.txt-type');
  const words = JSON.parse(txtElement.getAttribute('data-words'));
  const wait = txtElement.getAttribute('data-wait');
  //Init TypeWriter
  new TypeWriter(txtElement, words, wait);
}

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


const [auth, setAuth] = useState(false);

const readSession = async() =>{
  const res = await hasSignedIn();
  console.log(res);
  if(res.data.auth){
    setAuth(true);
  }
}
useEffect(() => {readSession();}, []);
return (
   
  <AuthApi.Provider value={{auth, setAuth}}>
  <Router>
    <div className="App">
      <Nav socket={socket}></Nav>
      <Routes socket={socket}/>
    </div>
  </Router>
  </AuthApi.Provider>

);
}

export default App;
//Drop down functionality is based on: https://codedaily.io/tutorials/63/Create-a-Dropdown-in-React-that-Closes-When-the-Body-is-Clicked