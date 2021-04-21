import React, { Component } from 'react';
import './App.css';
import LogIn from './LogIn';
import SignUp from './SignUp';
import { Link} from "react-router-dom";

class Nav extends Component{
    constructor(props){
        super(props);
    }

    render(){
        const headerfont = {
            color: "white",
            fontFamily: "Courier",
            textDecoration: "none"

        };
        
        return(
            <nav class = "navbar sticky-top navbar-light bg-dark"> 
            <div class = "fancy">
                <h2 style={headerfont}> 
                {/* how to take out the blue */}
                    <Link to="/" style={{color:"white", textDecoration: 'none' }}> 
                    <span class="txt-type" data-wait="3000" data-words='["codeBlack"]'> </span>
                    
                        {/* <li style={headerfont}><h5>Home</h5></li> */}
                    </Link>
                </h2>
            </div>

           
            <ul className="navLinks">
                

                <Link to="/discussion" style={{ textDecoration: 'none' }}>
                <li style={headerfont}><h5>Discussion Board</h5></li>
                </Link>

                <Link to="/resources" style={{ textDecoration: 'none' }}>
                    <li style={headerfont}><h5>Resources</h5></li>
                </Link>
 
                {/* <Link to="signUp">
                <li style={headerfont}><h5>Sign Up</h5> </li>
                </Link> */}
 
                <Link to="logIn" style={{ textDecoration: 'none' }}>
                <li style={headerfont}><h5>Log in</h5></li>
                </Link>
                
                <Link to="profile" style={{ textDecoration: 'none' }}>
                <li style={headerfont}><h5>Profile</h5></li>
                </Link>

            </ul>
        </nav>
        );
    }
}
export default Nav;