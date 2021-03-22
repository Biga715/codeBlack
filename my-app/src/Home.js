import React, { Component } from 'react';
import './App.css';
import HomeBanner from './HomeBanner';

class Home extends Component {
   
        constructor(props){
            super(props);
        }
    
        render(){
            const mystyle = {
                color: "black",
                backgroundColor: "Bisque",
                padding: "10px",
                fontFamily: "Arial"
              };
             const newstyle = {
                color: "black",
                backgroundColor: "Bisque",
                padding: "10px",
                fontFamily: "Arial"
              };
            return(
            <div id="picBanner">
                <img id = "bannerPic"src="https://i.pinimg.com/originals/ae/81/5f/ae815fbd4538f2f3e56d069e93d2c455.jpg" alt="our logo"></img>
                <h1 style={mystyle}>Mission Statement</h1>
                <div>
                    <p>An organization created to foster community among the black students in Computer Science. Where we strive to see more black people thriving in the field of technology.</p>
                </div>
                <h1 style={mystyle}>Executive Board Members</h1>
                <div>
                <img id = "founder" src="https://i.groupme.com/1024x1024.jpeg.f631f454fbb44ba89fd6d1a5b5092061.preview" ></img>
                <h2> Pryce Y.</h2>
                <div>
                    <img id = "founder" src="https://i.groupme.com/1024x1024.jpeg.aebece1ddfc7467b958b8a23cfec48dd.preview" ></img>
                    <h2 >Oyin S.</h2>
                </div>
                <div>
                <img id = "founder" src="https://i.groupme.com/999x999.jpeg.85474be1b0ff488d90839deb7be074ae.preview" ></img>
                <h2 > Arric L.</h2>
                </div>
                <div>
                    <img id = "founder" src="https://i.groupme.com/1024x1024.jpeg.ea851003f7994c0c8fb0f0d1fb9553c7.preview" ></img>
                    <h2 > B'Elanna B.</h2>
                </div>
                </div>
            </div>
          
            );
        }
}
export default Home;
