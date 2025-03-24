import '../styles/flipCard.css'; // Adjust path as needed
import React, { useState, useRef, useEffect } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { Document, Page, pdfjs } from 'react-pdf';
import { Upload, ChevronLeft, ChevronRight, Loader2, ChevronDown, ChevronUp } from 'lucide-react';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Set up the worker for PDF.js
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

function App() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [pdfFile, setPdfFile] = useState(null);
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [leftWidth, setLeftWidth] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [pdfText, setPdfText] = useState(null);
  const [isParsing, setIsParsing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [numLectures, setNumLectures] = useState(1);
  const [lectureDuration, setLectureDuration] = useState(60);
  const [openAccordion, setOpenAccordion] = useState(null);
  const containerRef = useRef(null);

  // Initialize variables from URL query parameters
  useEffect(() => {
    const lectures = searchParams.get('lectures');
    const duration = searchParams.get('duration');
    if (lectures) setNumLectures(parseInt(lectures, 10) || 1);
    if (duration) setLectureDuration(parseInt(duration, 10) || 60);

    console.log("You are in feature: " + params.feature);
  }, [searchParams, params.feature]);

  const difficulty = searchParams.get('difficulty') || 'medium';
  const questions = searchParams.get('questions') ? parseInt(searchParams.get('questions'), 10) : 10;
  const instructions = searchParams.get('instructions') || '';

  const onFileChange = async (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setPdfFile(file);
      setPageNumber(1);
      setIsParsing(true);
      await parsePdf(file);
      setIsParsing(false);
    }
  };

  const parsePdf = async (file) => {
    try {
      const formData = new FormData();
      formData.append('pdf', file);
      formData.append('feature', params.feature || 'lesson');
  
      if (params.feature === 'lesson') {
        formData.append('numLectures', numLectures);
        formData.append('lectureDuration', lectureDuration);
      } else if (params.feature === 'assignment') {
        formData.append('difficulty', difficulty);
        formData.append('questions', questions);
        formData.append('instructions', instructions);
      } else if (params.feature === 'flashcards') {
        formData.append('instructions', instructions);
      }
  
      const response = await fetch('http://localhost:3001/api/parse-pdf', {
        method: 'POST',
        body: formData,
      });
  
      const data = await response.json();
      if (response.ok) {
        if (params.feature === 'summarization') {
          console.log('Summary of the PDF:', data.text);
          setPdfText(data.text);
        } else if (params.feature === 'lesson') {
          console.log('Lesson Plan:', data.text);
          let lessonPlan = data.text;
          if (typeof data.text === 'string') {
            try {
              lessonPlan = JSON.parse(data.text);
            } catch (e) {
              console.error('Failed to parse lesson plan JSON:', e);
            }
          }
          setPdfText(lessonPlan);
        } else if (params.feature === 'assignment') {
          console.log('Assignment Questions:', data.questions);
          setPdfText(data.questions);
        } else if (params.feature === 'flashcards') {
          console.log('Flashcards:', data.flashcards);
          setPdfText(data.flashcards);
        } else {
          console.log('Extracted PDF text:', data.text);
          setPdfText(data.text);
        }
      } else {
        console.error('Error from server:', data.error);
        setPdfText('Error parsing PDF: ' + data.error);
      }
    } catch (error) {
      console.error('Error parsing PDF:', error);
      setPdfText('Failed to extract text from PDF.');
    }
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const changePage = (offset) => {
    setPageNumber((prevPageNumber) => Math.min(Math.max(1, prevPageNumber + offset), numPages));
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !containerRef.current) return;
    const container = containerRef.current.getBoundingClientRect();
    const newWidth = ((e.clientX - container.left) / container.width) * 100;
    setLeftWidth(Math.max(20, Math.min(80, newWidth)));
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const handleLessonPlanSubmit = () => {
    setIsModalOpen(false);
    if (pdfFile) {
      setIsParsing(true);
      parsePdf(pdfFile).then(() => setIsParsing(false));
    }
  };

  const toggleAccordion = (index) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 relative">
      {/* Loader Overlay */}
      {isParsing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
            <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
            <p className="mt-4 text-lg text-gray-700">Parsing PDF, please wait...</p>
          </div>
        </div>
      )}

      {/* Lesson Planning Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Set Lesson Plan Details</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Number of Lectures
              </label>
              <input
                type="number"
                min="1"
                value={numLectures}
                onChange={(e) => setNumLectures(Math.max(1, parseInt(e.target.value)))}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Duration per Lecture (minutes)
              </label>
              <input
                type="number"
                min="1"
                value={lectureDuration}
                onChange={(e) => setLectureDuration(Math.max(1, parseInt(e.target.value)))}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleLessonPlanSubmit}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Set
              </button>
            </div>
          </div>
        </div>
      )}

      {!pdfFile ? (
        <div className="flex flex-col items-center justify-center min-h-[90vh]">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <Upload className="w-16 h-16 text-blue-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Upload PDF Document</h2>
            <label className="cursor-pointer bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition-colors">
              Choose File
              <input type="file" accept=".pdf" onChange={onFileChange} className="hidden" />
            </label>
          </div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto" ref={containerRef}>
          <div className="bg-white rounded-lg shadow-lg p-6 flex" style={{ height: '95vh' }}>
            {/* Left Section: PDF Viewer */}
            <div
              className="overflow-auto border-r relative"
              style={{ width: `${leftWidth}%`, minWidth: '20%', maxWidth: '80%' }}
            >
              <div className="sticky top-0 bg-white z-10 p-4 border-b">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold truncate">{pdfFile?.name || 'No File Selected'}</h2>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setPdfFile(null)}
                      className="text-red-500 hover:text-red-600"
                    >
                      Change File
                    </button>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => changePage(-1)}
                        disabled={pageNumber <= 1}
                        className="p-2 rounded-full hover:bg-gray-100 disabled:opacity-50"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <span className="text-sm">
                        Page {pageNumber} of {numPages}
                      </span>
                      <button
                        onClick={() => changePage(1)}
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

            {/* Draggable Divider */}
            <div
              className="w-2 bg-gray-300 cursor-col-resize hover:bg-gray-400 transition-colors"
              onMouseDown={handleMouseDown}
            />

            {/* Right Section: Parsed PDF Content */}
            <div
              className="overflow-auto p-4"
              style={{ width: `${100 - leftWidth}%`, minWidth: '20%' }}
            >
              <h3 className="text-lg font-semibold mb-4">PDF Content</h3>
              
              <div className="bg-gray-100 p-4 rounded-lg h-full overflow-y-auto">
                {pdfText ? (
                  params.feature === 'lesson' && Array.isArray(pdfText) ? (
                    <div className="space-y-4">
                      {pdfText.map((week, index) => (
                        <div key={index} className="border border-gray-300 rounded-md">
                          <button
                            onClick={() => toggleAccordion(index)}
                            className="w-full flex justify-between items-center p-4 bg-gray-200 hover:bg-gray-300 text-left text-gray-800 font-semibold"
                          >
                            <span>{week.title}</span>
                            {openAccordion === index ? (
                              <ChevronUp className="w-5 h-5" />
                            ) : (
                              <ChevronDown className="w-5 h-5" />
                            )}
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
                  ) : params.feature === 'assignment' && Array.isArray(pdfText) ? (
                    <div className="space-y-4">
                      {pdfText.map((item) => (
                        <div
                          key={item.number}
                          className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-200"
                        >
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="text-lg font-semibold text-gray-800">
                              Question {item.number}
                            </h4>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                            </span>
                          </div>
                          <p className="text-gray-700 text-base leading-relaxed">{item.question}</p>
                        </div>
                      ))}
                    </div>
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
          </div>
        </div>
      )}
    </div>
  );
}

export default App;