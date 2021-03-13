import React from "react";
import './App.css';

function SignUp() {

    return (
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

                <label for="pword"> Password:</label><br></br>
                <input type="password" id="pword" name="pword"></input><br></br>

                <label for="cpword"> Confirm Password:</label><br></br>
                <input type="password" id="cpword" name="cpword"></input><br></br>



                <input type="submit" value="Sign Up"></input>
            </form>


        </div>
    );
}

export default SignUp;