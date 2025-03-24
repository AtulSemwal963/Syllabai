import { useState } from 'react';

const usePdfViewer = () => {
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return { numPages, pageNumber, setPageNumber, onDocumentLoadSuccess };
};

export default usePdfViewer;