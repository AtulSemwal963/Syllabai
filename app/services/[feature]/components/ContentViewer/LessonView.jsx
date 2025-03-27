import { ChevronDown, ChevronUp } from 'lucide-react';

export default function LessonView({ pdfText, openAccordion, toggleAccordion }) {
  if (!Array.isArray(pdfText)) {
    return <p className="text-gray-600">Invalid lesson plan format</p>;
  }

  return (
    <div className="space-y-4">
      {pdfText.map((week, index) => (
        <div key={index} className="border border-gray-300 rounded-md">
          <button
            onClick={() => toggleAccordion(index)}
            className="w-full flex justify-between items-center p-4 bg-gray-200 hover:bg-gray-300 text-left text-gray-800 font-semibold"
          >
            <span>{week.title}</span>
            {openAccordion === index ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>
          {openAccordion === index && (
            <div className="p-4 bg-white">
              {week.lectures.map((lecture) => (
                <div key={lecture.number} className="mb-6 last:mb-0">
                  <h4 className="text-md font-medium text-gray-700 mb-2">
                    Lecture {lecture.number}: {lecture.title}
                  </h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p><strong>Objective:</strong> {lecture.objective}</p>
                    <p><strong>Content:</strong> {lecture.content}</p>
                    <p><strong>Activity:</strong> {lecture.activity}</p>
                    <p><strong>Homework:</strong> {lecture.homework}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
} 