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
                backgroundColor: "Light grayish orange",                
                padding: "10px",
                fontFamily: "Helvetica"
              };
             const newstyle = {
                color: "black",
                backgroundColor: "Light grayish orange",
                padding: "10px",
                fontFamily: "Helvetica"
              };
            return(
                        // out of line, gif banner, animate title
            <div id="picBanner">
                <img id = "bannerPic" src="banner3.png" alt="our logo"></img>
                <br></br>
                <h1 style={mystyle}>Mission Statement</h1>
                <div>
                    <p>An organization created to foster community among the black students in Computer Science. Where we strive to see more black people thriving in the field of technology.</p>
                </div>
                <br></br>
                <h1 style={mystyle}>Executive Board Members</h1>
                <div class = "container">
                    <div class="row">
                    <div class="col"> <img id = "founder" src="pryce.png" ></img> <h2> Pryce Y.</h2></div>
                    <div class="col"> <img id = "founder" src="oyin.png" ></img><h2 >Oyin S.</h2></div>
                    <div class="col"> <img id = "founder" src="arric.png" ></img><h2 > Arric L.</h2></div>
                    <div class="col">  <img id = "founder" src="belanna.png" ></img><h2 > B'Elanna B.</h2></div>
            </div>
            <br></br>
            <br></br>

            </div>
            </div>
          
            );
        }
}
export default Home;
