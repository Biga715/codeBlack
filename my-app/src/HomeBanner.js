import React, { Component } from 'react';

/*
function HomeBanner(){

    return (
       
        <div id="picBanner">
            <img id = "bannerPic"src="https://i.pinimg.com/originals/ae/81/5f/ae815fbd4538f2f3e56d069e93d2c455.jpg" alt="our logo"></img>
        </div>
      
    );
}
*/

class HomeBanner extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div id="picBanner">
            <img id = "bannerPic"src="banner2.png" alt="our logo"></img>
        </div>
      
        );
    }
}
export default HomeBanner;