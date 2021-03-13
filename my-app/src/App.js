import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import HomeBanner from './HomeBanner';
import LogIn from './LogIn';
import SignUp from './SignUp';
import Nav from './Nav';
import Discussion from './Discussion';
import Home from './Home';

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";






class App extends Component {

  constructor(props) {
    super(props);
    this.signUp = this.signUp.bind(this);
    this.inputRef = React.createRef();
  }

  /*

  container = React.createRef();
  containerP = React.createRef();

  state = {
    openMenu: false,
    openProfile: false,
  };





  handleButtonClick = () => {
    this.setState(state => {
      return {
        openMenu: !state.openMenu,
      };
    });
  };

  handleClickOutside = event => {
    if (this.container.current && !this.container.current.contains(event.target)) {
      console.log(this.container.current);
      console.log(event.target);
      
      
      this.setState({
        openMenu: false,
      });
    }
  };




  handleButtonClickProfile = () => {
    this.setState(state => {
      return {
        openProfile: !state.openProfile,
      };
    });
  };

  
  handleClickOutsideProfile = event => {
    if (this.containerP.current && !this.containerP.current.contains(event.target)) {
      
   
      this.setState({
        openProfile: false,
      });
    }
  };
  



  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
    document.addEventListener("mousedown", this.handleClickOutsideProfile);
  }

  componentWillUnmount() {
  document.removeEventListener("mousedown", this.handleClickOutside);
  document.removeEventListener("mousedown", this.handleClickOutsideProfile);
  }
  */

  render() {






    return (


      <Router>
        <div className="App">
          <Nav></Nav>
          <Switch>
            <Route path="/" exact component={Home}></Route>
            <Route path="/discussion" component={Discussion}></Route>
            <Route path="/signUp" component={SignUp}></Route>
            <Route path="/logIn" component={LogIn}></Route>
          </Switch>

        </div>
      </Router>

      /*
       <div className="App">
         <header className="App-header">
           
         {/*
           <div id="header">
             <h1 id="codeBlackLogo"> &lt;codeBlack/&gt;</h1>
           <Router>
             <div className="container" ref={this.container}>
              <button type="button" onClick={this.handleButtonClick} class="button" id="menuBtn">
               ☰
               </button>
 
               {this.state.openMenu && (
             <div className="dropdown">
               <ul>
                 
                 
                 <li>About Us</li>
                 <Link to="/signUp">
                 <li> Resume Review </li>
                 </Link> 
                 <li>Discussion Board</li>
                 <li>Profile</li>
                 
              </ul>
             </div>
             )}
             </div>
 
 
           
          
           <Switch>
           <Route path="/signUp" component={SignUp} />
           <Route path="/logIn" component={LogIn} />
           </Switch>
                
             <div className="container" ref={this.containerP}>
              <button type="button" onClick={this.handleButtonClickProfile} class="button" id="profileBtn">
              👤
 
               </button>
 
 
               {this.state.openProfile && (
             <div className="dropdown" id="profileDrop">
               <ul>
         
                 
                 <Link to="/signUp">
                 <li >Sign Up</li>
                 </Link>
 
                 
 
                 
                 <li > <Link to="/logIn"> Log In </Link>
                 </li>
                 
                 
              </ul>
             </div>
             
             )}
             </div>
             
 
             </Router>
 
           
 
           </div>
               
         <Nav></Nav>
           
 
         <div id= "mainP">
           <HomeBanner/>
           <form>
           Username: <input type="text" id="username"/>&nbsp;
           Email: <input type="text" id="email"/>&nbsp;
           Password: <input type="password" id="password"/>&nbsp;
           <button onClick={this.signUp}>Sign Up</button><br/>
         </form>
         </div>
         
         </header>
         
       </div>
             */

    );

  }


  signUp(event) {
    event.preventDefault();

    let newUser = {
      username: document.getElementById("username").value,
      email: document.getElementById("email").value,
      password: document.getElementById("password").value
    }
    console.log(newUser);

    axios.post('http://localhost:4000/signup', newUser)
      .then(res => {
        console.log(res);
        document.getElementById("status").innerText = res.data.msg;
        this.error = '';
        // this.$router.push('/login');
      }, err => {
        console.log(err.response);
        document.getElementById("status").innerText = err.response.data.msg;
      })
    // console.log(newUser);

  }

}

export default App;
//Drop down functionality is based on: https://codedaily.io/tutorials/63/Create-a-Dropdown-in-React-that-Closes-When-the-Body-is-Clicked