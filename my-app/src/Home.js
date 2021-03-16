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
            <div>
                <HomeBanner></HomeBanner>
            </div>
        );
    }
}

export default Home;