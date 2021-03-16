import React, { Component } from 'react';
import './App.css';
import axios from 'axios';


class LogIn extends Component{
    constructor(props){
        super(props);
        this.logIn = this.logIn.bind(this);
    }



    logIn(event){
        event.preventDefault();
        let user = {
          username: document.getElementById("unameLogIn").value,
          password: document.getElementById("pwordLogIn").value
        }
        axios.post('http://localhost:4000/login', user)
        .then(res => {
            // console.log(res);
            //if it works
            if(res.status === 200){
                console.log(res.data.msg)
                // localStorage.setItem('token', res.data.token);
                // document.getElementById("status").innerText=res.data.msg;
                // this.$router.push('/home');
            }
        }, err => {
            this.error = err.response.data.msg;
            console.log(this.error);
            // console.log(err);
            // document.getElementById("status").innerText=err.response.data.msg;
        })
      }
    render(){
        return(
<div id="logInContainer">
            <h1>Log In</h1>
            <form id="logInForm" >

                <label for="uname"> Username:</label><br></br>
                <input type="text" id="unameLogIn" name="uname"></input><br></br>

                <label for="pword"> Password:</label><br></br>
                <input type="password" id="pwordLogIn" name="pword"></input><br></br>

                <input type="submit" value="Log In" onClick={this.logIn}></input>
            </form>


        </div>
        );
    }
}

export default LogIn;