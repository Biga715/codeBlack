import React, { Component, useState, useEffect } from 'react';
import './App.css';
import ConvoList from './ConvoList';
import ChatBar from './ChatBar';
import ChatWindow from'./ChatWindow';
import socketClient  from "socket.io-client";
import axios from 'axios';

import OnlineList from './OnlineList';




const SERVER = "http://localhost:4000";
var socket = socketClient(SERVER);
// const uploader = new SocketIOFileUpload(socket);


function Discussion() {
    
    const [state, setState] = useState({message: '', name: ''});


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
        if(sessionStorage.getItem('currentUser') != null){
            state.name = sessionStorage.getItem('currentUser');
        }

       
        // console.log("name: " + name);
        // return chat.map(({ name, message, file}, index) =>(
        return chat.map(({ name, message}, index) =>(
          <div key={index} className="message" className={state.name == name ? 'myMessage': 'otherMessage'}>
             {/* <p id="message">{name}: {message} {file.name}</p> */}
             <p id="message">{name}: {message}</p>
          </div>
        ))
      }
    
        return(
          // https://www.youtube.com/watch?v=6xG5JOB69Us&list=WL&index=1&t=2092s
            <div>
            <form id="tempNameForm">
                <label>Name: </label>
                <input type="text" name="name" value={state.name} onChange={onTextChange}></input>
            </form>
            <ChatWindow renderChat={renderChat()} state={state}></ChatWindow>
            <ConvoList></ConvoList>
            <OnlineList></OnlineList>
            
            <ChatBar  onTextChange={onTextChange} onMessageSubmit={onMessageSubmit} state={state}></ChatBar>

            </div>
        
        );
    
}
export default Discussion;