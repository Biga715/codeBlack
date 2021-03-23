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
        //                <h1 style={mystyle}>Mission Statement</h1>
        const headerfont = {
            color: "white",
            fontFamily: "Courier"
          };
        return(
            <nav>
            <h1 id="codeBlackLogo" style={headerfont}> &lt;codeBlack/&gt;</h1>
 
            <ul className="navLinks">
                <Link to="/">
                <li style={headerfont}>Home</li>
                </Link>

                <Link to="/discussion">
                <li style={headerfont}>Discussion Board</li>
                </Link>
 
                <Link to="signUp">
                <li style={headerfont}> Sign Up</li>
                </Link>
 
                <Link to="logIn">
                <li style={headerfont}>Log in</li>
                </Link>
                
                <Link to="profile">
                <li style={headerfont}>Profile</li>
                </Link>

            </ul>
        </nav>
        );
    }
}
export default Nav;