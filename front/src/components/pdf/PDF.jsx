import { SpecialZoomLevel, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { memo } from 'react';


const PdfViewer = memo(({ pdfData, plugins }) => {
   return (
      <Viewer 
         fileUrl={pdfData} 
         defaultScale={SpecialZoomLevel.ActualSize} 
         plugins={plugins}
      />
   );
});


PdfViewer.displayName = 'PdfViewer'

export default PdfViewer;