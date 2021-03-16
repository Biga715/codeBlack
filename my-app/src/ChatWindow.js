import React, { Component } from 'react';
import './App.css';


class ChatWindow extends Component{
    constructor(props){
        super(props);
    }
    
    

    render(){
        console.log(this.props.message);
        console.log(this.props.msg);
        const msg = this.props.message;
        console.log(msg)
        var thisIsMyCopy = '<p>hi</p>'; 
     //<p class="message">{thisIsMyCopy}</p>
        console.log(thisIsMyCopy)
        return(
            <div id="chatWindow">
            <h1 id="convoTitle">Conversation Title</h1>

            <div class="otherMessage">
                <p class="message"> Hello, my name is not Arric Lucas but I do have a message for you. I hope that your
                life is filled with positivity and good vibes only. There are great things ahead in the future. Get into it!</p>

            </div>


           
        <div id = "testMsg" class="myMessage" dangerouslySetInnerHTML={{__html:thisIsMyCopy}}></div>



            <div class="otherMessage">
                <p class="message"> Hello, my name is not Arric Lucas but I do have a message for you. I hope that your
                life is filled with positivity and good vibes only. There are great things ahead in the future. Get into it!</p>

            </div>

            <div class="myMessage">
                <p class="message">Hello.</p>
            </div>

            <div class="myMessage">
                <p class="message">Yessir, one day we will all be doing great things and making the world a better place one day at a time. I am 
                so excited for those times and seeing how we all grow with time.</p>
            </div>

            <div class="otherMessage">
                <p class="message"> I am just adding a bunch of extra information to see if the overflow will work. If it works then great! If it does not,
                then we have ourselves a little prediciment. I am pretty sure that I spelled that wrong, but it is what it is. I just want to finish this semester
                off because 347 is killing me. My fingers are now starting to cramp up.</p>

            </div>


            <div class="myMessage">
                <p class="message">Give me a lever long enough and a fulcrum on which to place it, and I shall move the world.</p>
            </div>

            <div class="myMessage">
                <p class="message">Do all the good you can, by all the means you can, in all the ways you can, in all the places you can, 
                at all the times you can, to all the people you can, as long as ever you can..</p>
            </div>


            <div class="otherMessage">
                <p class="message"> I am just adding a bunch of extra information to see if the overflow will work. If it works then great! If it does not,
                then we have ourselves a little prediciment. I am pretty sure that I spelled that wrong, but it is what it is. I just want to finish this semester
                off because 347 is killing me. My fingers are now starting to cramp up.</p>

            </div>

            <div class="myMessage">
                <p class="message">IM OUTSIDE IN AN AMG -Drake🥺</p>
            </div>
            
        </div>
       
        );

       
    }
}
export default ChatWindow;
