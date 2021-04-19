import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import AuthApi from './AuthApi';


//TODO: Import profile database and display information

class Profile extends Component{
    constructor(props){
        super(props);
        this.getProfileData = this.getProfileData.bind(this);
        this.logout = this.logout.bind(this);
    }
    static contextType = AuthApi;
    getProfileData(){
        let data = {
            user: sessionStorage.getItem('currentUser')
        };
        console.log("profile user data: " + data.user)
        axios.post('http://localhost:4000/getProfileData', data)
            .then(res => {
                // console.log(res);
                this.profile = res.data[0];
                console.log(this.profile);
                // document.getElementById("btn1Logout").style.visibility = "hidden";
                if(this.profile != null){
                    document.getElementById("username").textContent = this.profile.username;
                    document.getElementById("name").textContent = "Name: " + this.profile.name;
                    document.getElementById("year").textContent = "Year: " + this.profile.year;
                    document.getElementById("major").textContent = "Major: " + this.profile.major;
                    document.getElementById("skills").textContent = "Skills: " + this.profile.skills;
                    document.getElementById("bio").textContent = "About Me: " + this.profile.bio;
                    // document.getElementById("logout").style.visibility = "visible";
                }
            })
    }
    logout(){
        axios.get('http://localhost:4000/logout')
        .then(res => {
            console.log(res);
        })
            // this.props.history.push('/LogIn');
        localStorage.clear();
        // sessionStorage.clear();
        document.getElementById("username").textContent = "";
        document.getElementById("name").textContent = "Name: ";
        document.getElementById("year").textContent = "Year: ";
        document.getElementById("major").textContent = "Major: ";
        document.getElementById("skills").textContent = "Skills: ";
        document.getElementById("bio").textContent = "About Me: ";
        this.context.setAuth(false);
    }


    render(){
        return(
        <section id ="profile my-4 mx-5">
            <div class = "profileContainer">
                <div class = "row no-gutters" id = "profileDesign">
                    <div class = "col-lg-5">
                        <img id= "profileImage" src ="profile-image.png" class = "img-fluid" alt=""></img>
                        <img id= "avatar" src ="defaultuser.png" class = "img-fluid mt-3 mb-3 mx-4" alt=""></img>
                    </div>
                  <div class="col-lg-7 px-5 pt-5">

                    <div class="col-lg-7">
                        <h1 id="name">My Name is </h1>
                    </div>
                    <div class="col-lg-7">
                        <h5 id="username"> </h5>
                    </div>

                    <div class="col-lg-7">
                        <h5 id="year">Year: </h5>
                    </div>
                    <div class="col-lg-7">
                        <h5 id="major">Major: </h5>
                    </div>
                    <div class="col-lg-7">
                        <h5 id="skills">Skills: </h5>
                    </div>
        
                    <div class="col-lg-7">
                     <h5 id="bio">About Me: </h5>

                    </div>
                    <div class="col-lg-7">
                        <button type="submit" onClick={this.logout} value="Logout" id="btn1Logout" class="btn1 mt-3 mb-3">Log Out</button>
               {/* <input type="submit" onClick={this.getProfileData} value="Get Data"></input> */}
               </div>
                

            <h3 id = "status"></h3>
        </div>
    </div>
</div>
</section>        
        );
        
    }
    componentDidMount(){
        this.getProfileData();

        axios.get("http://localhost:4000/getUser")
        .then(
            res =>{
                console.log(res);
            },
            err =>{
                console.log(err);
            }
        )
    }
}
export default Profile;