import React from "react";
import './App.css';
import ConvoList from './ConvoList';
import ChatBar from './ChatBar';
import ChatWindow from'./ChatWindow';
function Discussion() {

    return (
        
        <div>
            
            
            

            <ChatWindow></ChatWindow>
            <ConvoList></ConvoList>
            <ChatBar></ChatBar>
        </div>
        
    );
}

export default Discussion;