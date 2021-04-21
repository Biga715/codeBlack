import React, { Component, useState, useEffect } from 'react';
import axios from "axios";
import './App.css';
import Pdf from './Pdf';
import resource1 from './resourceFiles/tech-resume-cheat-sheet.pdf';
import resource2 from './resourceFiles/linkedin-cheat-sheet.pdf';
import resource3 from './resourceFiles/Email&LinkedInOutreachTemplates.pdf';
import resource4 from './resourceFiles/cover-letter-cheat-sheet.pdf';
import resource5 from './resourceFiles/ATS-friendly Resume v1 (courtesy of Unfold Careers).pdf'






 function Resources(props){
    const [file, setFile] = useState();
    const [fileName, setFileName] = useState("");






    let getFiles = async () => {
      
        try{
            let res = await axios.post(
                "http://localhost:4000/getFiles"
            );
            console.log(res);
            uploadedFiles = res.data;
            
            return res.data;
            
        } catch (err) {
            console.log(err);
        } 
    }
    let [uploadedFiles, setUploadedFiles] = useState([resource1, resource2, resource3, resource4, resource5 ]);
    console.log(uploadedFiles);
    let test = ["hello", "mello", "jello"];

    const saveFile = (e) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
    }


    const displayFiles = async () => {
        setUploadedFiles(await getFiles());
    }
    
    const fileUpload = async (e) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("fileName", fileName);
        try{
            const res = await axios.post(
                "http://localhost:4000/upload",
                formData
            );
            console.log(res);
            console.log( await getFiles().then((res) => {return res;}));
            setUploadedFiles(await getFiles());
        } catch (err) {
            console.log(err);
        }
    }

/*This is code for adding files and stuff
    <input type="file" onChange={saveFile}></input>
    <button onClick={fileUpload}>Add Resource</button>
    <button onClick={displayFiles}>Show Files</button>
    <Pdf fileName={file}></Pdf>
    */
    console.log(props);
    return(
        <div id="resources">

            {uploadedFiles.map((file) => (
                <Pdf height={20} fileName={file}></Pdf>
            ))}
        </div>

    );
  
}
export default Resources;
