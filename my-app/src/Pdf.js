import React, { useState } from 'react';
import { Page, Document, pdfjs } from 'react-pdf';
//import { Document } from 'react-pdf/dist/esm/entry.webpack';

const url = 
"https://classics.berkeley.edu/sites/default/files/2020-01/sample.pdf"
 function Pdf(props){
    

    pdfjs.GlobalWorkerOptions.workerSrc = "cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js"
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
        setPageNumber(1);
    }



    
    console.log(props);
    return(
        <div id="pdf">
        <Document file="url" onLoadSuccess={onDocumentLoadSuccess} onLoadError={console.log(url)}>
        <Page pageNumber={pageNumber} />
        </Document>
      
        </div>

    );
  
}
export default Pdf;