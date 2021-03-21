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
         render(){
        return(
            <div>
            <section id = "colorlib-hero" className="js-fullheight" data-section="home">
            <div className= "flex-slider js-fullheight">
            <ul className = "slides">
            <li style = {{ backgroundImage: //'url ()'}} //Need to put url image of the homepage
            <div className= "overlay" />
            <div className = "container-fluid">
            <div className= "row">
            <div className= "col-md-6 col-md-offset-3 col-md-pull-3 col-sm-12 col-xs-12 js-fullheight slider-text">
            <div className = "slider-inner-text js-fullheight">
            <div className= "desc">
            <w0> className= Welcome! <br 
            
            
    }

    render(){
        return(
            <div>
                <HomeBanner></HomeBanner>
            </div>
        );
    }
}

export default Home;
