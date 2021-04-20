import React, { Component } from 'react';
import './App.css';


class OnlineList extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div id="onlineList">
            <h1 id="onlineListTitle">Online Users🟢</h1>


            <div id="onlineContainer">
                <h2 class="onlineUser">John</h2>
                <h2 class="onlineUser">John</h2>
                <h2 class="onlineUser">John</h2>
                <h2 class="onlineUser">John</h2>
                <h2 class="onlineUser">John</h2>
                <h2 class="onlineUser">John</h2>
                <h2 class="onlineUser">John</h2>
                <h2 class="onlineUser">John</h2>
                <h2 class="onlineUser">John</h2>
               
            </div>
        </div>
        );
    }
}
export default OnlineList;