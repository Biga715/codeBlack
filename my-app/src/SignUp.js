import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import AuthApi from './AuthApi';
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
    static contextType = AuthApi;

    signUp(event) {
        event.preventDefault();
        
        let newUser = {
          username: document.getElementById("uname").value,
          email: document.getElementById("email").value,
          password: document.getElementById("pword").value,
          confirm: document.getElementById('cpword').value,
          fullName: document.getElementById("fname").value,
          grade: document.getElementById("grade").value,
          bio: document.getElementById("bio").value,
          skills: document.getElementById("skills").value
        }
        console.log(newUser);
    
        axios.post('http://localhost:4000/signup', newUser)
          .then(res => {
            console.log(res);
            this.error = '';
            // if(res.data.auth){
            //     this.context.setAuth(true);
            // }
            document.getElementById("status").innerText=res.data.msg;
            localStorage.setItem('token', res.data.token);

            axios.post('http://localhost:4000/addProfile', newUser)
            .then(res => {
                console.log(res);
                this.context.setAuth(true);
            }, err =>{
                console.log(err.response);
            })
            // history.push('/login');
          }, err => {
            console.log(err.response);
            document.getElementById("status").innerText=err.response.data.msg;
        })

    
      }

    render(){
      const headerfont = {
        color: "black",
        fontFamily: "Courier"
      };  
      return(
        <section id ="signUpBox my-4 mx-5">
            <div class = "container">
                <div class = "row no-gutters" id = "signUpDesign">
                <div class = "col-lg-5" id = "defaultUserPicBox">
                            <img id = "signUpImage" src="signup-image.png" class = "img-fluid" alt=""></img>
                        </div>
                  <div class="col-lg-7 px-5 pt-5">
                  <h1>Sign Up</h1>
                  <h4 >Make your new account</h4>
                  <form>

                <div class="form-row">
                    <div class="col-lg-7">
                        <input type="text" id="fname" name="fname" placeholder = "Full Name" class = "form-control my-2 p-3"></input>
                    </div>
                </div>
                <div class="form-row">
                    <div class="col-lg-7">
                        <input type="text" id="uname" name="uname" placeholder = "Username" class = "form-control my-2 p-3"></input>
                    </div>
                </div>
                <div class="form-row">
                    <div class="col-lg-7">
                        <input type="text" id="email" name="email" placeholder = "Email" class = "form-control my-2 p-3"></input>
                    </div>
                </div>
                <div class="form-row">
                    <div class="col-lg-7">
                        <input type="text" id="grade" name="grade" placeholder = "Academic Year" class = "form-control my-2 p-3"></input>
                    </div>
                </div>
                <div class="form-row">
                    <div class="col-lg-7">
                        <input type="text" id="major" name="major" placeholder = "Major" class = "form-control my-2 p-3"></input>
                    </div>
                </div>
                <div class="form-row">
                    <div class="col-lg-7">
                        <input type="text" id="bio" name="bio" placeholder = "Bio" class = "form-control my-2 p-3"></input>
                    </div>
                </div>
                <div class="form-row">
                    <div class="col-lg-7">
                        <input type="text" id="skills" name="skills" placeholder = "Skills" class = "form-control my-2 p-3"></input>
                    </div>
                </div>
                <div class="form-row">
                    <div class="col-lg-7">
                        <input type="password" id="pword" name="pword" placeholder = "Password" class = "form-control my-2 p-3"></input>
                    </div>
                </div>
                <div class="form-row">
                    <div class="col-lg-7">
                        <input type="password" id="cpword" name="cpword" placeholder = "Confirm Password" class = "form-control my-2 p-3"></input>
                    </div>
                </div>
                <div class="form-row">
                    <div class="col-lg-7">
                        <button type="submit" value="Sign Up" onClick={this.signUp} id="btn1SignUp" class="btn1 mt-3 mb-3">Sign Up</button>
                        {/* <input type="submit" onClick={this.signUp} value="Sign Up"></input> */}
                    </div>
                </div>
                

                {/* <label for="fname" > Full Name:</label><br></br>
                <></input><br></br> */}

                {/* <label for="uname"> Username:</label><br></br>
                <></input><br></br> */}

                {/* <label for="email"> Email:</label><br></br>
                <input type="text" id="email" name="email"></input><br></br> */}

                {/* <label for="grade"> Academic Year:</label><br></br>
                <input type="text" id="grade" name="grade"></input><br></br> */}

                {/* <label for="major"> Major:</label><br></br>
                <input type="text" id="major" name="major"></input><br></br> */}

                {/* <label for="bio"> Bio:</label><br></br>
                <input type="text" id="bio" name="bio"></input><br></br> */}

                {/* <label for="skills"> Skills:</label><br></br>
                <input type="text" id="skills" name="skills"></input><br></br> */}

                {/* <label for="pword"> Password:</label><br></br>
                <input type="password" id="pword" name="pword"></input><br></br> */}

                {/* <label for="cpword"> Confirm Password:</label><br></br>
                <input type="password" id="cpword" name="cpword"></input><br></br> */}

            <h3 id = "status"></h3>
            </form>
        </div>
    </div>
</div>
</section>

        );
    }
}
export default SignUp;
