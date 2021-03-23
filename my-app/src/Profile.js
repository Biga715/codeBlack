import React, { Component } from 'react';
import './App.css';

//TODO: Import profile database and display information

class Profile extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
        <div id="profile">
            
            <div id="convoContainer">
               <img id= "avatar" src ="defaultuser.png"></img>
               <h2 class="username">Username</h2>
               <h2 class="year">Year</h2>
               <h2 class="major">Major</h2>
               <h2 class="skils">Skills</h2>
               <h2 class="bio">About Me:</h2>
            </div>
        </div>
        );
    }
}
export default Profile;