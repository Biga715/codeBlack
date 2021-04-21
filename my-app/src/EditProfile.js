import React, { Component } from 'react';
import './App.css';
import Profile from './Profile';
import { Link, Redirect} from "react-router-dom";
import axios from 'axios';
import AuthApi from './AuthApi';
import session from 'express-session';
// import { useHistory } from "react-router-dom";


class EditProfile extends Component{
  constructor(props){
    super(props);
    this.getProfileData = this.getProfileData.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
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
                document.getElementById("editedUName").value = this.profile.username;
                document.getElementById("editedName").value = this.profile.name;
                document.getElementById("editedYear").value = this.profile.year;
                document.getElementById("editedMajor").value = this.profile.major;
                document.getElementById("editedSkills").value = this.profile.skills;
                document.getElementById("editedBio").value = this.profile.bio;
                // document.getElementById("logout").style.visibility = "visible";
            }
        })
}
updateProfile(){
  // let history = useHistory();
    let data = {
      oldUsername: sessionStorage.getItem('currentUser'),
      newUsername: document.getElementById("editedUName").value,
      // email: document.getElementById("editedEmail").value,
      // password: document.getElementById("editedPword").value,
      // confirm: document.getElementById('editedCpword').value,
      fullName: document.getElementById("editedName").value,
      grade: document.getElementById("editedMajor").value,
      bio: document.getElementById("editedBio").value,
      skills: document.getElementById("editedSkills").value
    }
    console.log(data);

    axios.post('http://localhost:4000/updateProfile', data)
    .then(res => {
        console.log(res);
        sessionStorage.setItem('currentUser', res.data.newUser);
        document.getElementById("status").innerText="Profile Updated."
    }, err =>{
        console.log(err.response);
        document.getElementById("status").innerText=err.response.data.msg;
    })

        // this.props.history.push('/LogIn');
    // localStorage.clear();
    // sessionStorage.clear();
    document.getElementById("username").textContent = "Username: ";
    document.getElementById("name").textContent = "My Name is ";
    document.getElementById("year").textContent = "Year: ";
    document.getElementById("major").textContent = "Major: ";
    document.getElementById("skills").textContent = "Skills: ";
    document.getElementById("bio").textContent = "About Me: ";
    // <Redirect to="/profile"/>
    // this.props.history.push('/profile');
    // history.push('/profile');
    // this.context.setAuth(false);
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
                    <input id="editedName" type = "text"></input>
                </div>
                <div class="col-lg-7">
                    <h5 id="username"> Username: </h5>
                    <input id="editedUName" type = "text"></input>
                </div>

                <div class="col-lg-7">
                    <h5 id="year">Year: </h5>
                    <input id="editedYear" type = "text"></input>
                </div>
                <div class="col-lg-7">
                    <h5 id="major">Major: </h5>
                    <input id="editedMajor" type = "text"></input>
                </div>
                <div class="col-lg-7">
                    <h5 id="skills">Skills: </h5>
                    <input id="editedSkills" type = "text"></input>
                </div>
    
                <div class="col-lg-7">
                 <h5 id="bio">About Me: </h5>
                 <input id="editedBio" type = "text"></input>
                </div>
                {/* <Link to="editProfile">
                    <p>Need to make a change? <a href="#">Edit profile here.</a></p>
                </Link> */}
                <div class="col-lg-7">
                  <br></br>
                    <button type="submit" onClick={this.updateProfile} value="Update" id="btn1Logout" class="btn1 mt-3 mb-3">Update Profile</button>
                    <h3 id="status"></h3>
                    <Link to="profile">
                        <p>Back to Profile Page</p>
                    </Link>
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
export default EditProfile;