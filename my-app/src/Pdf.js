import React, { useState } from 'react';
import { Page, Document, pdfjs } from 'react-pdf';

import pdfFile2 from './resource1.pdf';
//import pics from 'src/resourceFiles';
//import { Document } from 'react-pdf/dist/esm/entry.webpack';

//const url = "https://cors-anywhere.herokuapp.com/http://www.africau.edu/images/default/sample.pdf"

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
 function Pdf(props){
    

    //pdfjs.GlobalWorkerOptions.workerSrc = "cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js"
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
        setPageNumber(1);
    }

    //let pdf ="/resourceFiles/" + props.fileName ;
    let pdf="sample.pdf";
    console.log(pdf);

    
    console.log(props);
    return(
        <div id="pdf">
        <Document file={props.fileName}  onLoadSuccess={onDocumentLoadSuccess} onLoadError={console.error}>
        <Page pageNumber={pageNumber} />
        </Document>
      
        </div>

    );
  
}
export default Pdf;