import React, { Component } from 'react';
import './App.css';
import ChatWindow from './ChatWindow';
import socketClient  from "socket.io-client";
const SERVER = "http://localhost:3000";
var socket = socketClient(SERVER);

//send message to the server (alerts right now)
/*socket.on("sentMsg", function SendMsgData(){


}) */

/*function sendMessage(){
    var socket = socketClient(SERVER);
   
    const msg = document.getElementById("textBox").value;
    alert(msg)

    socket.emit("message_to_server", {message:msg});

    //document.getElementById("textMessage").value = " ";

}*/

class ChatBar extends Component{
    constructor(props){
        super(props);
    }
    /*state = {
        data: barData
    }*/

    sendMessage= () => {
        var socket = socketClient(SERVER);
       
        const msg = document.getElementById("textBox").value;
        alert(msg);
        
        socket.emit("message_to_server", {message:msg});
    
        //document.getElementById("textMessage").value = " ";
    
    }

    render(){
     
        return(
            
            <div id="chatBar">
            
             <ChatWindow message={"msgs"}></ChatWindow>

            <form onSubmit={() => this.sendMessage() }id="textForm">
            <button id="attachBtn"> 📎</button>
                <input type="text" id="textBox"></input>
                <input type="submit" value="Send" id="sendBtn"></input>
            </form>
           
         </div>
         
        );
    }
}

export default ChatBar;