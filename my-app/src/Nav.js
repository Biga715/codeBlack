import React, { Component } from 'react';
import './App.css';
import LogIn from './LogIn';
import SignUp from './SignUp';
import { Link} from "react-router-dom";
/*
function Nav() {

    return (
       <nav>
           <h1 id="codeBlackLogo"> &lt;codeBlack/&gt;</h1>

           <ul className="navLinks">
               <Link to="/">
               <li>Home</li>
               </Link>

               <Link>
               <li>About Us</li>
               </Link>

               <Link to="/discussion">
               <li>Discussion Board</li>
               </Link>

               <Link to="signUp">
               <li>Sign Up</li>
               </Link>

               <Link to="logIn">
               <li>Log in</li>
               </Link>
               
           </ul>
       </nav>
    
    );
}
*/
class Nav extends Component{
    constructor(props){
        super(props);
    }

    render(){
        const headerfont = {
            color: "white",
            fontFamily: "Courier"
        };
        return(
            <nav class = "navbar sticky-top navbar-light bg-dark"> 
            <div class = "fancy">
                <h2 style={headerfont}> 
                    <span class="txt-type" data-wait="3000" data-words='["codeBlack"]'> </span>
                </h2>
            </div>

           
            <ul className="navLinks">
                <Link to="/">
                <li style={headerfont}><h5>Home</h5></li>
                </Link>

                <Link to="/discussion">
                <li style={headerfont}><h5>Discussion Board</h5></li>
                </Link>
 
                <Link to="signUp">
                <li style={headerfont}><h5>Sign Up</h5> </li>
                </Link>
 
                <Link to="logIn">
                <li style={headerfont}><h5>Log in</h5></li>
                </Link>
                
                <Link to="profile">
                <li style={headerfont}><h5>Profile</h5></li>
                </Link>

            </ul>
        </nav>
        );
    }
}
export default Nav;