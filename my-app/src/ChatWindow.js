import React, { Component } from 'react';
import './App.css';


 function ChatWindow(props){
 
    
    console.log(props);
    return(
        <div id="chatWindow">
        
        {props.renderChat}
      
        </div>

    );
  
}
export default ChatWindow;
