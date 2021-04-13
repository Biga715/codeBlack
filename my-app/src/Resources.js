import React, { Component } from 'react';
import './App.css';
import Pdf from './Pdf';


 function Resources(props){
 
    
    console.log(props);
    return(
        <div id="resources">
            <button>Add Resource</button>
            <Pdf></Pdf>
      
        </div>

    );
  
}
export default Resources;
