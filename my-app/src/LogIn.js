import React, { Component } from 'react';
import './App.css';
import {Button, Form, FormGroup, Label, Input}from 'reactstrap';
import {FacebookLoginButton} from 'react-social-login-buttons';
import axios from 'axios';
import { Link} from "react-router-dom";
import AuthApi from './AuthApi';
import { Socket } from 'socket.io';
import socketClient  from "socket.io-client";

//const SERVER = "http://localhost:4000";
//var socket = socketClient(SERVER);


class LogIn extends Component{
    constructor(props){
        super(props);
        this.logIn = this.logIn.bind(this);
        console.log(props);
    }
    static contextType = AuthApi;

   
    logIn(event){
        // const authApi = React.useContext(AuthApi);
        event.preventDefault();
        let user = {
          username: document.getElementById("unameLogIn").value,
          password: document.getElementById("pwordLogIn").value,
          id: 0, //giving id a random value
        }
        axios.post('http://localhost:4000/login', user)
        .then(res => {
            console.log(res);
            // if it works
            if(res.status === 200){
                // console.log(res.data.user)
                localStorage.setItem('token', res.data.token);
                sessionStorage.setItem('currentUser', res.data.user.username);

                //this is added to help add id and data to user in server side
                this.props.socket.emit("logIn", user);
               
              
                this.props.socket.on('getUser', (currUser)=>{
                    user = currUser;
                    console.log("get user");
                    console.log(user);
                })


                if(res.data.auth){
                    this.context.setAuth(true);
                }
                console.log(res.data.msg);
                // localStorage.setItem('token', res.data.token);
                axios.get("http://localhost:4000/isUserAuth",{
                    headers:{
                        "x-access-token": localStorage.getItem("token")
                    }
                })
                .then((res) => {
                    console.log(res);
                });
                document.getElementById("status").innerText=res.data.msg;
                // this.$router.push('/home');
            }
        }, err => {
            this.error = err.response.data.msg;
            console.log(this.error);
            // console.log(err);
            document.getElementById("status").innerText="Invalid Credentials";
        })
    }
    


    render(){
        const headerfont = {
            color: "black",
            fontFamily: "Courier"
        };
        

        return(
 
            <section id ="LogIn my-4 mx-5">
                <div class = "container">
                    <div class = "row no-gutters" id = "loginDesign">
                        <div class = "col-lg-5">
                            <img id = "loginPic" src="login-image.png" class = "img-fluid" alt=""></img>
                        </div>
                        <div class="col-lg-7 px-5 pt-5">
                            <h1>Log In</h1>
                            <h4 >Sign into your account</h4>
                            <form>
                                <div class="form-row">
                                    <div class="col-lg-7">
                                        <input type="text" id="unameLogIn" placeholder = "Username" name="uname" class = "form-control my-2 p-3"></input>
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="col-lg-7">
                                        <input type="password" id="pwordLogIn" placeholder = "Password" name="pword" class = "form-control my-2 p-3"></input>
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="col-lg-7">
                                        <button type="submit" value="Log In" onClick={this.logIn} id="btn1Login" class="btn1 mt-3 mb-3">Log In</button>
                                        {/* <input  type="submit" value="Log In" onClick={this.logIn}></input> */}
                                    </div>
                                </div>
                                {/* <a href = "#">Forgot password?</a> */}
                                <Link to="signUp">
                                <p>Don't have an account?<a href="#">  Register here</a></p>
                                {/* <li style={headerfont}><h5>Sign Up</h5> </li> */}
                                </Link>
                                
                            </form>
                        </div>

            {/* 
                <FormGroup>
                <label for="uname"> Username  </label>
                <br></br>
                </FormGroup>
               
                <FormGroup>
                <label for="pword"> Password  </label>
                <br></br>
                </FormGroup>
                
                <FormGroup>
                <input type="submit" value="Log In" onClick={this.logIn}></input>
                </FormGroup>
                 */}
                 <h3 id = "status"></h3>
                    </div>
                </div>
            </section>

        );
    }
}


export default LogIn;