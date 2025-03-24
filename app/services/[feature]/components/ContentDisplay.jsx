import React, { useState } from 'react';
import LessonAccordion from './LessonAccordion';
import AssignmentList from './AssignmentList';
import { useParams } from 'next/navigation';

const ContentDisplay = ({ pdfText }) => {
  const params = useParams();
  const [openAccordion, setOpenAccordion] = useState(null);

  console.log('pdfText in ContentDisplay:', pdfText); // Log here

  const toggleAccordion = (index) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  return (
    <div className="overflow-auto p-4 h-full">
      <h3 className="text-lg font-semibold mb-4">PDF Content</h3>
      <div className="bg-gray-100 p-4 rounded-lg h-full overflow-y-auto">
        {pdfText ? (
          params.feature === 'lesson' && Array.isArray(pdfText) ? (
            <LessonAccordion pdfText={pdfText} openAccordion={openAccordion} toggleAccordion={toggleAccordion} />
          ) : params.feature === 'assignment' && Array.isArray(pdfText) ? (
            <AssignmentList pdfText={pdfText} />
          ) : (
            <pre className="text-gray-600 whitespace-pre-wrap">
              {typeof pdfText === 'string' ? pdfText : JSON.stringify(pdfText, null, 2)}
            </pre>
          )
        ) : (
          <p className="text-gray-600">No content extracted yet.</p>
        )}
      </div>
    </div>
  );
};

export default ContentDisplay;