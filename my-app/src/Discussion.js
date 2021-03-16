import React, { Component } from 'react';
import './App.css';
import ConvoList from './ConvoList';
import ChatBar from './ChatBar';
import ChatWindow from'./ChatWindow';

/*
function Discussion() {

    return (
        
        <div>
            
            
            

            <ChatWindow></ChatWindow>
            <ConvoList></ConvoList>
            <ChatBar></ChatBar>
        </div>
        
    );
}
*/
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