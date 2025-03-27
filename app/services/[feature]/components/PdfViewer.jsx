import { Document, Page } from 'react-pdf';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function PDFViewer({
  pdfFile,
  pageNumber,
  numPages,
  onDocumentLoadSuccess,
  changePage,
}) {
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
        className="max-w-full"
      >
        <Page
          pageNumber={pageNumber}
          renderTextLayer={true}
          renderAnnotationLayer={true}
          className="max-w-full"
        />
      </Document>
    </div>
  );
} 