"use client";
import React, { useState, useRef, useEffect } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { Document, Page, pdfjs } from 'react-pdf';
import { Upload, ChevronLeft, ChevronRight, Loader2, ChevronDown, ChevronUp } from 'lucide-react';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import './flipcard.css';

import FileUpload from './components/FileUpload';
import PDFViewer from './components/PDFViewer';
import LoadingOverlay from './components/LoadingOverlay';
import LessonPlanModal from './components/LessonPlanModal';
import ContentViewer from './components/ContentViewer';
import usePDFHandler from './hooks/usePDFHandler';
import useResizable from './hooks/useResizable';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

export default function FeaturePage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const containerRef = useRef(null);
  const {
    pdfFile, setPdfFile, numPages, setNumPages, pageNumber,
    pdfText, pptxFile, isParsing, onFileChange, changePage
  } = usePDFHandler(params);

  const { leftWidth, handleMouseDown } = useResizable(containerRef);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [numLectures, setNumLectures] = useState(1);
  const [lectureDuration, setLectureDuration] = useState(60);
  const [openAccordion, setOpenAccordion] = useState(null);
  const [flippedCards, setFlippedCards] = useState({});

  const feature = params.feature;
  const type = searchParams.get('type') || 'standard';
  const numSlides = searchParams.get('numSlides');
  const slides = searchParams.get('slides');
  const instructions = searchParams.get('instructions') ? decodeURIComponent(searchParams.get('instructions')) : '';
  const difficulty = searchParams.get('difficulty') || 'medium';
  const questions = searchParams.get('questions') ? parseInt(searchParams.get('questions'), 10) : 10;

  useEffect(() => {
    console.log('CSS import path:', './flipcard.css');
    const lectures = searchParams.get('lectures');
    const duration = searchParams.get('duration');
    if (lectures) setNumLectures(parseInt(lectures, 10) || 1);
    if (duration) setLectureDuration(parseInt(duration, 10) || 60);
    console.log("You are in feature: " + feature);
    console.log("Received Query Params:", {
      feature,
      type,
      numSlides,
      slides,
      instructions,
      numLectures,
      lectureDuration,
      difficulty,
      questions,
    });
  }, [searchParams, feature]);

  const getOptions = () => {
    switch (feature) {
      case "presentation":
        return { type, numSlides, slides, instructions };
      case "lesson":
        return { numLectures, lectureDuration, instructions };
      case "assignment":
        return { difficulty, questions, instructions };
      case "flashcards":
        return { instructions };
      case "summarization":
        return {};
      default:
        return { instructions };
    }
  };

  const handleDownloadPresentation = () => {
    if (!pptxFile?.blob){
      console.log("No PPTX file available to download.");
      return Promise.reject(new Error("No presentation file generated yet"));
    }
    return new Promise((resolve) => {
      const blob = pptxFile.blob;
      const filename = pptxFile.filename || `presentation_${Date.now()}.pptx`;
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      resolve();
    });
  };

  const handleLessonPlanSubmit = () => {
    setIsModalOpen(false);
    if (pdfFile) {
      console.log("Submitting lesson plan with options:", getOptions());
      onFileChange({ target: { files: [pdfFile] } }, getOptions());
    }
  };

  const handleFileChange = (e) => {
    console.log("handleFileChange triggered");
    onFileChange(e, getOptions());
  };

  const toggleAccordion = (index) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  const toggleFlip = (topicIndex, cardIndex) => {
    const key = `${topicIndex}-${cardIndex}`;
    setFlippedCards((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  console.log("Rendering FeaturePage, isParsing:", isParsing);

  return (
    <div className="min-h-screen bg-gray-100 p-8 relative">
      {isParsing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
            <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
            <p className="mt-4 text-lg text-gray-700">Processing PDF, please wait...</p>
          </div>
        </div>
      )}

      <LessonPlanModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        numLectures={numLectures}
        setNumLectures={setNumLectures}
        lectureDuration={lectureDuration}
        setLectureDuration={setLectureDuration}
        onSubmit={handleLessonPlanSubmit}
      />

      {!pdfFile ? (
        <div className="flex flex-col items-center justify-center min-h-[90vh]">
          <FileUpload onFileChange={handleFileChange} />
        </div>
      ) : (
        <div className="max-w-7xl mx-auto" ref={containerRef}>
          <div className="bg-white rounded-lg shadow-lg p-6 flex" style={{ height: '95vh' }}>
            <div
              className="overflow-auto border-r relative"
              style={{ width: `${leftWidth}%`, minWidth: '20%', maxWidth: '80%' }}
            >
              <PDFViewer
                pdfFile={pdfFile}
                pageNumber={pageNumber}
                numPages={numPages}
                onDocumentLoadSuccess={({ numPages }) => setNumPages(numPages)}
                changePage={changePage}
              />
            </div>

            <div
              className="w-2 bg-gray-300 cursor-col-resize hover:bg-gray-400 transition-colors"
              onMouseDown={handleMouseDown}
            />

            <div
              className="overflow-auto p-4"
              style={{ width: `${100 - leftWidth}%`, minWidth: '20%' }}
            >
              <h3 className="text-lg font-semibold mb-4">PDF Content</h3>
              <div className="bg-gray-100 p-4 rounded-lg h-full overflow-y-auto">
                <ContentViewer
                  feature={feature}
                  pdfText={feature === "presentation" ? null : pdfText}
                  pptxFile={feature === "presentation" ? pptxFile : null}
                  flippedCards={flippedCards}
                  toggleFlip={toggleFlip}
                  openAccordion={openAccordion}
                  toggleAccordion={toggleAccordion}
                  difficulty={difficulty}
                  onDownloadPresentation={feature === "presentation" ? handleDownloadPresentation : undefined}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}