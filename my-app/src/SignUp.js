import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
/*

    
    let newProfile={
        name: document.getElementById("fname").value,
        username: document.getElementById("uname").value,
        email: document.getElementById("email").value,
        year: document.getElementById("grade").value,
        major: document.getElementById("major").value,
        bio: document.getElementById("bio").value,
        skills: document.getElementById("skills").value
    }
    console.log(newProfile);
}
*/


class SignUp extends Component{
    constructor(props){
        super(props);
        this.signUp = this.signUp.bind(this);
    }


    signUp(event) {
        event.preventDefault();
        
        let newUser = {
          username: document.getElementById("uname").value,
          email: document.getElementById("email").value,
          password: document.getElementById("pword").value,
          fullName: document.getElementById("fname").value,
          grade: document.getElementById("grade").value,
          major: document.getElementById("major").value,
          bio: document.getElementById("bio").value,
          skills: document.getElementById("skills").value
        }
        console.log(newUser);
    
        axios.post('http://localhost:4000/signup', newUser)
          .then(res => {
            console.log(res);
            this.error = '';
            document.getElementById("status").innerText=res.data.msg;
            // this.$router.push('/login');
          }, err => {
            console.log(err.response);
            document.getElementById("status").innerText=err.response.data.msg;
        })

        axios.post('http://localhost:4000/addProfile', newUser)
          .then(res => {
            console.log(res);
            this.error = '';
            // this.$router.push('/login');
          }, err => {
            console.log(err.response);
        })
    
      }

    render(){
        return(
            <div id="signUpContainer">
            <h1>Sign Up</h1>
            <form id="signUpForm" >
                <label for="fname" > Full Name:</label><br></br>
                <input type="text" id="fname" name="fname"></input><br></br>

                <label for="uname"> Username:</label><br></br>
                <input type="text" id="uname" name="uname"></input><br></br>

                <label for="email"> Email:</label><br></br>
                <input type="text" id="email" name="email"></input><br></br>

                <label for="grade"> Academic Year:</label><br></br>
                <input type="text" id="grade" name="grade"></input><br></br>

                <label for="major"> Major:</label><br></br>
                <input type="text" id="major" name="major"></input><br></br>

                <label for="bio"> Bio:</label><br></br>
                <input type="text" id="bio" name="bio"></input><br></br>

                <label for="skills"> Skills:</label><br></br>
                <input type="text" id="skills" name="skills"></input><br></br>

                <label for="pword"> Password:</label><br></br>
                <input type="password" id="pword" name="pword"></input><br></br>

                <label for="cpword"> Confirm Password:</label><br></br>
                <input type="password" id="cpword" name="cpword"></input><br></br>



                <input type="submit" onClick={this.signUp} value="Sign Up"></input>
            </form>
            <h3 id = "status"></h3>


        </div>
        );
    }
}
export default SignUp;