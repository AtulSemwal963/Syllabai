import { useState } from 'react';

export default function PresentationView({ pdfText, onDownload, pptxFile }) {
  const [downloadStatus, setDownloadStatus] = useState(null);

  const handleDownloadClick = () => {
    // If no pptxFile is available, show an error status
    if (!pptxFile || !pptxFile.blob) {
      setDownloadStatus({ success: false, message: 'No presentation file available to download.' });
      return;
    }

    // Set preparing status
    setDownloadStatus({ success: null, message: 'Preparing download...' });

    try {
      // Use the blob and filename directly from pptxFile
      const blob = pptxFile.blob;
      const filename = pptxFile.filename || `presentation_${Date.now()}.pptx`;

      // Create a URL for the blob and trigger download
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      // Update status to success
      setDownloadStatus({ success: true, message: 'Presentation downloaded successfully!' });

      // Optionally call onDownload if provided (for consistency with parent component)
      if (onDownload) {
        onDownload()
          .then(() => console.log("Parent download handler executed"))
          .catch((err) => console.error("Parent download handler error:", err));
      }
    } catch (error) {
      setDownloadStatus({ success: false, message: `Failed to download: ${error.message}` });
    }
  };

  if (!pptxFile) {
    return <p className="text-gray-600">No presentation file available yet</p>;
  }

  return (
    <div className="space-y-4 p-6 bg-white rounded-lg shadow-md border border-gray-200">
      <h4 className="text-lg font-semibold text-gray-800">Download Your Presentation</h4>
      <p className="text-gray-700 text-base leading-relaxed">
        Your presentation is ready: <strong>{pptxFile.filename}</strong>. Click the button below to download it as a PowerPoint file.
      </p>
      <button
        onClick={handleDownloadClick}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
        disabled={downloadStatus && downloadStatus.success === null}
      >
        {downloadStatus && downloadStatus.success === null ? 'Preparing...' : 'Download Presentation'}
      </button>
      {downloadStatus && (
        <p className={downloadStatus.success ? 'text-green-600' : 'text-red-600'}>
          {downloadStatus.message}
        </p>
      )}
    </div>
  );
}

// import { useState } from 'react';
// import { Presentation, Slide, Text, Preview } from 'react-pptx';

// export default function PresentationView({ pptxFile, onDownload }) {
//   const [downloadStatus, setDownloadStatus] = useState(null);

//   const handleDownloadClick = () => {
//     if (!pptxFile || !pptxFile.blob) {
//       setDownloadStatus({ success: false, message: 'No presentation file available to download.' });
//       return;
//     }

//     setDownloadStatus({ success: null, message: 'Preparing download...' });

//     try {
//       const blob = pptxFile.blob;
//       const filename = pptxFile.filename || `presentation_${Date.now()}.pptx`;
//       const url = window.URL.createObjectURL(blob);
//       const link = document.createElement('a');
//       link.href = url;
//       link.download = filename;
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//       window.URL.revokeObjectURL(url);

//       setDownloadStatus({ success: true, message: 'Presentation downloaded successfully!' });

//       if (onDownload) onDownload();
//     } catch (error) {
//       setDownloadStatus({ success: false, message: `Failed to download: ${error.message}` });
//     }
//   };

//   if (!pptxFile || !pptxFile.blob) {
//     return <p className="text-gray-600">No presentation file available yet</p>;
//   }

//   return (
//     <div className="space-y-4 p-6 bg-white rounded-lg shadow-md border border-gray-200">
//       <h4 className="text-lg font-semibold text-gray-800">Presentation Preview & Download</h4>
//       <p className="text-gray-700 text-base leading-relaxed">
//         Your presentation is ready: <strong>{pptxFile.filename || "Unnamed Presentation"}</strong>.
//       </p>
//       <div className="border border-gray-300 rounded-md overflow-hidden shadow-sm" style={{ height: '500px' }}>
//         <Preview>
//           <Presentation>
//             <Slide>
//               <Text style={{ x: 1, y: 1, w: 8, h: 1, fontSize: 24 }}>
//                 Test Slide (Placeholder until we parse the PPTX)
//               </Text>
//             </Slide>
//           </Presentation>
//         </Preview>
//       </div>
//       <button
//         onClick={handleDownloadClick}
//         className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
//         disabled={downloadStatus && downloadStatus.success === null}
//       >
//         {downloadStatus && downloadStatus.success === null ? 'Preparing...' : 'Download Presentation'}
//       </button>
//       {downloadStatus && (
//         <p className={downloadStatus.success ? 'text-green-600' : 'text-red-600'}>
//           {downloadStatus.message}
//         </p>
//       )}
//     </div>
//   );
// }