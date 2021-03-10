import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component{
  constructor(props){
    super(props);
    this.signUp = this.signUp.bind(this);
    this.inputRef = React.createRef();
  }

  container = React.createRef();
  state = {
    open: false,
  };

  handleButtonClick = () => {
    this.setState(state => {
      return {
        open: !state.open,
      };
    });
  };

  handleClickOutside = event => {
    if (this.container.current && !this.container.current.contains(event.target)) {
      this.setState({
        open: false,
      });
    }
  };


  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
  document.removeEventListener("mousedown", this.handleClickOutside);
  }
  
  render() {




   

    return (
      <div className="App">
        <header className="App-header">
          <div id="header">
            <h1 id="codeBlackLogo"> &lt;codeBlack/&gt;</h1>

            <div class="container" ref={this.container}>
             <button type="button" onClick={this.handleButtonClick} class="button" id="menuBtn">
              ☰
              </button>
            </div>

            {this.state.open && (
            <div class="dropdown">
              <ul>
                <li>About Us</li>
                <li>Resume Review</li>
                <li>Discussion Board</li>
                <li>Profile</li>
             </ul>
            </div>
            )}

          </div>
         
        
     
          <form>
          Username: <input type="text" id="username"/>&nbsp;
          Email: <input type="text" id="email"/>&nbsp;
          Password: <input type="password" id="password"/>&nbsp;
          <button onClick={this.signUp}>Sign Up</button><br/>
        </form>
        <p id ="status"></p>
        </header>
        
      </div>
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

    axios.post('http://localhost:4000/signup',newUser)
    .then(res => {
        console.log(res);
        document.getElementById("status").innerText=res.data.msg;
        this.error = '';
        // this.$router.push('/login');
    }, err =>{
        console.log(err.response);
        document.getElementById("status").innerText=err.response.data.msg;
    })
    // console.log(newUser);

  }
  
}

export default App;
//Drop down functionality is based on: https://codedaily.io/tutorials/63/Create-a-Dropdown-in-React-that-Closes-When-the-Body-is-Clicked