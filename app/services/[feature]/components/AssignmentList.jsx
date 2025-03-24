import React from 'react';
import { useSearchParams } from 'next/navigation';

const AssignmentList = ({ pdfText }) => {
  const searchParams = useSearchParams();
  const difficulty = searchParams.get('difficulty') || 'medium';

  return (
    <div className="space-y-4">
      {pdfText.map((item) => (
        <div
          key={item.number}
          className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-200"
        >
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-gray-800">Question {item.number}</h4>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
            </span>
          </div>
          <p className="text-gray-700 text-base leading-relaxed">{item.question}</p>
        </div>
      ))}
    </div>
  );
};

export default AssignmentList;