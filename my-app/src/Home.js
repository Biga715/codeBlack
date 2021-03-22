import React, { Component } from 'react';
import './App.css';
import HomeBanner from './HomeBanner';
/*
function Home() {

    return (
        <div>
            <HomeBanner></HomeBanner>
        </div>
    );
}
*/

class Home extends Component {
   
        constructor(props){
            super(props);
        }
    
        render(){
            return(
                <div id="picBanner">
                <img id = "bannerPic"src="https://i.pinimg.com/originals/ae/81/5f/ae815fbd4538f2f3e56d069e93d2c455.jpg" alt="our logo"></img>
            </div>
          
            );
        }
}
export default Home;
