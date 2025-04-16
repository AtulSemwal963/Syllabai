"use client";
import { Document, Page, pdfjs } from 'react-pdf';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

// Configure PDF worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

export default function PDFViewer({
  pdfFile,
  pageNumber,
  numPages,
  onDocumentLoadSuccess,
  changePage,
}) {
  const [error, setError] = useState(null);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-4 text-red-500">
        <p>Error loading PDF: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center gap-2 mb-4">
        <button
          onClick={() => changePage(-1)}
          disabled={pageNumber <= 1}
          className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <span className="text-sm">Page {pageNumber} of {numPages}</span>
        <button
          onClick={() => changePage(1)}
          disabled={pageNumber >= numPages}
          className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
      
      <Document 
        file={pdfFile} 
        onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={(error) => setError(error)}
        className="max-w-full"
        loading={
          <div className="flex items-center justify-center p-4">
            <p>Loading PDF...</p>
          </div>
        }
      >
        <Page
          pageNumber={pageNumber}
          renderTextLayer={true}
          renderAnnotationLayer={true}
          className="max-w-full"
          loading={
            <div className="flex items-center justify-center p-4">
              <p>Loading page {pageNumber}...</p>
            </div>
          }
        />
      </Document>
    </div>
  );
} 