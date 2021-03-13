import React from "react";
import './App.css';

function ChatBar() {

    return (
        <div id="chatBar">
           
           <form id="textForm">
           <button id="attachBtn"> 📎</button>
               <input type="text" id="textBox"></input>
               <input type="submit" value="Send" id="sendBtn"></input>
           </form>
        </div>
    );
}

export default ChatBar;