import React, { Component } from 'react';
import './App.css';
import axios from 'axios';


//TODO: Import profile database and display information

class Profile extends Component{
    constructor(props){
        super(props);
        this.getProfileData = this.getProfileData.bind(this);
        this.logout = this.logout.bind(this);
    }
    getProfileData(){
        axios.get('http://localhost:4000/getProfileData' )
            .then(res => {
                // console.log(res);
                this.profile = res.data[0];
                console.log(this.profile);
                document.getElementById("logout").style.visibility = "hidden";
                if(this.profile != null){
                    document.getElementById("username").textContent = this.profile.username;
                    document.getElementById("name").textContent = "Name: " + this.profile.name;
                    document.getElementById("year").textContent = "Year: " + this.profile.year;
                    document.getElementById("major").textContent = "Major: " + this.profile.major;
                    document.getElementById("skills").textContent = "Skills: " + this.profile.skills;
                    document.getElementById("bio").textContent = "About Me: " + this.profile.bio;
                    document.getElementById("logout").style.visibility = "visible";
                }
            })
    }
    logout(){
        axios.get('http://localhost:4000/logout' )
            .then(res => {
                console.log(res);
                document.getElementById("username").textContent = "";
                document.getElementById("name").textContent = "Name: ";
                document.getElementById("year").textContent = "Year: ";
                document.getElementById("major").textContent = "Major: ";
                document.getElementById("skills").textContent = "Skills: ";
                document.getElementById("bio").textContent = "About Me: ";
                this.props.history.push('/LogIn');
            })
            // this.props.history.push('/LogIn');
    }


    render(){
        return(
        <div id="profile">
            
            <div id="profileContainer">
               <img id= "avatar" src ="defaultuser.png"></img>
               <h2 id="username"></h2>
               <h2 id="name">Name: </h2>
               <h2 id="year">Year: </h2>
               <h2 id="major">Major: </h2>
               <h2 id="skills">Skills: </h2>
               <h2 id="bio">About Me: </h2>
               {/* <input type="submit" onClick={this.getProfileData} value="Get Data"></input> */}
               <input type="submit" onClick={this.logout} value="Logout" id="logout"></input>
            </div>
        </div>
        );
        
    }
    componentDidMount(){
        this.getProfileData();
    }
}
export default Profile;