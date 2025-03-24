import React from 'react';
import { Document, Page } from 'react-pdf';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const PdfViewer = ({ pdfFile, pageNumber, numPages, onDocumentLoadSuccess, setPageNumber, onChangeFile }) => (
  <div className="overflow-auto border-r relative h-full">
    <div className="sticky top-0 bg-white z-10 p-4 border-b">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold truncate">{pdfFile?.name || 'No File Selected'}</h2>
        <div className="flex items-center gap-4">
          <button onClick={onChangeFile} className="text-red-500 hover:text-red-600">
            Change File
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPageNumber((prev) => Math.max(1, prev - 1))}
              disabled={pageNumber <= 1}
              className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-sm">Page {pageNumber} of {numPages}</span>
            <button
              onClick={() => setPageNumber((prev) => Math.min(numPages, prev + 1))}
              disabled={pageNumber >= numPages}
              className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
    <div className="p-4 bg-gray-50">
      {pdfFile && (
        <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess} className="max-w-full">
          <Page
            pageNumber={pageNumber}
            renderTextLayer={true}
            renderAnnotationLayer={true}
            className="max-w-full"
          />
        </Document>
      )}
    </div>
  </div>
);

export default PdfViewer;