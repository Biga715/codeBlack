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
        this.state ={
            textVal: ' ',
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
        alert(msg);
        
        socket.emit("message_to_server", {message:msg});
    
        //document.getElementById("textMessage").value = " ";
    
    }
   

    render(){
     
        return(
            
            <div id="chatBar">
            
             <ChatWindow message={this.state.textVal}></ChatWindow>

            <form onSubmit={() => this.sendMessage() }id="textForm">
            <button id="attachBtn"> 📎</button>
                <input type="text" id="textBox" value={this.state.textVal} onChange={this.handleChange}></input>
                <input type="submit" value="Send" id="sendBtn"></input>
            </form>
           
         </div>
         
        );
    }
}


export default ChatBar;