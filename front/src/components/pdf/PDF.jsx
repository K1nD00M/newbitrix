import { SpecialZoomLevel, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { memo } from 'react';
import { getFilePlugin } from '@react-pdf-viewer/get-file';

const PdfViewer = memo(({ pdfData }) => {
   const getFilePluginInstance = getFilePlugin();
   const { DownloadButton } = getFilePluginInstance;

   return (
      <>
         <div
            style={{
               alignItems: 'center',
               backgroundColor: '#eeeeee',
               borderBottom: '1px solid rgba(0, 0, 0, 0.3)',
               display: 'flex',
               padding: '4px',
            }}
         >
            <DownloadButton />
         </div>
         <Viewer 
            fileUrl={pdfData} 
            defaultScale={SpecialZoomLevel.ActualSize} 
            plugins={[getFilePluginInstance]}
         />
      </>
   );
});


PdfViewer.displayName = 'PdfViewer'

export default PdfViewer;