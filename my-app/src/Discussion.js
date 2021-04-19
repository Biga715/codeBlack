import React, { Component, useState, useEffect } from 'react';
import './App.css';
import ConvoList from './ConvoList';
import ChatBar from './ChatBar';
import ChatWindow from'./ChatWindow';
import socketClient  from "socket.io-client";
import axios from 'axios';
import SocketIOFileUpload from "socketio-file-upload";



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
const uploader = new SocketIOFileUpload(socket);


function Discussion() {
    const [state, setState] = useState({message: '', name: '',file: null});
    const [file, setFile] = useState(null)
    const [placeholder, setPlaceholder] = useState("Type message ...")
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
        const {name, message} = state;
     
        socket.emit('message', {name, message,file});
        setState({message: '', name});
        console.log(state);
        
      }
      
      const onTextChange = (e) => {
        setState({...state, [e.target.name]: e.target.value })
      }
      const onFileUpload = (e) => {
        //setFile(e.target.files[0])
        //setPlaceholder(e.target.files[0].name)

        setState({...state, [e.target.file]: e.target.value })
       
        uploader.listenOnInput(e.target.files[0])
        alert(e.target.files[0].name)
      }

      const sendFile = () =>{
        alert("Send File Called")

      }
      
      const renderChat = () => {
        console.log("render chat");
        console.log(chat);
        console.log("state.name: " + state.name);
       
        // console.log("name: " + name);
        return chat.map(({ name, message, file}, index) =>(
          <div key={index} className="message" className={state.name == name ? 'myMessage': 'otherMessage'}>
             <p id="message">{name}: {message} {file.name}</p>
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
            <ChatBar  onTextChange={onTextChange} onMessageSubmit={onMessageSubmit} onFileUpload={onFileUpload} sendFile={sendFile} state={state}></ChatBar>
            </div>
        
        );
    
}
export default Discussion;