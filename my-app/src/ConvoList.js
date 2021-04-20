import React, { Component } from 'react';
import './App.css';


class ConvoList extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div id="convoList">
            <h1 id="convoListTitle">Active Chats</h1>


            <div id="convoContainer">
                <h2 class="convoName">Conversation 1</h2>
               
               
            </div>
        </div>
        );
    }
}
export default ConvoList;