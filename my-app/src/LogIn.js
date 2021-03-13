import React from "react";
import './App.css';

function LogIn() {

    return (
<div id="logInContainer">
            <h1>Log In</h1>
            <form id="logInForm" >

                <label for="uname"> Username:</label><br></br>
                <input type="text" id="uname" name="uname"></input><br></br>

                <label for="pword"> Password:</label><br></br>
                <input type="password" id="pword" name="pword"></input><br></br>

                <input type="submit" value="Log In"></input>
            </form>


        </div>
    );
}

export default LogIn;