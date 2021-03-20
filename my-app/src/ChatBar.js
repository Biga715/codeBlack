import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import ChatWindow from './ChatWindow';
import socketClient  from "socket.io-client";
const SERVER = "http://localhost:3000";
var socket = socketClient(SERVER);


class ChatBar extends Component{
    constructor(props){
        super(props);
        this.state ={
            textVal: ' ',
            selectedFile: null,
        }

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event){
        this.setState({
            textVal: event.target.value,
        })

        console.log(this.state.textVal);
    }

    sendMessage= () => {
        var socket = socketClient(SERVER);
       
        const msg = document.getElementById("textBox").value;

        socket.emit("message_to_server", {message:msg});
    
    }
    fileUploadButton = () => {
        document.getElementById('fileButton').click();
        document.getElementById('fileButton').onchange = () =>{      
        this.setState({
            fileUploadState:document.getElementById('fileButton').value
                });
            }
        
    }

    render(){
     
        return(
            
            <div id="chatBar">
            
             <ChatWindow message={this.state.textVal}></ChatWindow>
        

            <form id="textForm">
            <input type="file" id="fileButton" />
                <button onClick={this.fileUploadButton} component="span" id="attachBtn"> 📎</button>
                {this.state.selectedFile}
                <input type="text" id="textBox" value={this.state.textVal} onChange={this.handleChange}></input>
                <input type="submit" value="Send" id="sendBtn"></input>
            </form>
           
         </div>
         
        );
    }
}


export default ChatBar;