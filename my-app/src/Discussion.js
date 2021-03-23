import React, { Component, useState, useEffect } from 'react';
import './App.css';
import ConvoList from './ConvoList';
import ChatBar from './ChatBar';
import ChatWindow from'./ChatWindow';
import socketClient  from "socket.io-client";
import axios from 'axios';


/*
class Discussion extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
        
            <div>
            
            
            

            <ChatWindow></ChatWindow>
            <ConvoList></ConvoList>
            <ChatBar></ChatBar>
            </div>
        
        );
    }
}
export default Discussion;
*/
const SERVER = "http://localhost:4000";
var socket = socketClient(SERVER);
function Discussion() {
    const [state, setState] = useState({message: '', name: ''});
    // set state.name to current user
    // figure out how to get current user from server.js to discussion.js
    // Adding a new profile
    // axios.post('http://localhost:4000/getCurrentUser', newUser)
    //       .then(res => {
    //         console.log(res);
    //         this.error = '';
    //         // this.$router.push('/login');
    //       }, err => {
    //         console.log(err.response);
    //     })
    // state.name = "belanna";

    const [chat, setChat] = useState([]);

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
      
      const renderChat = () => {
        console.log("render chat");
        console.log(chat);
        console.log("state.name: " + state.name);
        // console.log("name: " + name);
        return chat.map(({ name, message}, index) =>(
          <div key={index} className="message" className={state.name == name ? 'myMessage': 'otherMessage'}>
             <p id="message">{name}: {message}</p>
          </div>
        ))
      }
    
        return(
        
            <div>
            <form id="tempNameForm">
                <label>Name:</label>
                <input type="text" name="name" value={state.name} onChange={onTextChange}></input>
            </form>
            <ChatWindow renderChat={renderChat()} state={state}></ChatWindow>
            <ConvoList></ConvoList>
            <ChatBar  onTextChange={onTextChange} onMessageSubmit={onMessageSubmit} state={state}></ChatBar>
            </div>
        
        );
    
}
export default Discussion;