import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'next/navigation';

const usePdfParser = ({ pdfFile, numLectures, lectureDuration, setPdfText }) => {
  const [pdfText, setLocalPdfText] = useState(null);
  const [isParsing, setIsParsing] = useState(false);
  const params = useParams();
  const searchParams = useSearchParams();

  const difficulty = searchParams.get('difficulty') || 'medium';
  const questions = searchParams.get('questions') ? parseInt(searchParams.get('questions'), 10) : 10;
  const instructions = searchParams.get('instructions') || '';

  const parsePdf = async (file) => {
    setIsParsing(true);
  try {
    const formData = new FormData();
    formData.append('pdf', file);
    formData.append('feature', params.feature || 'lesson');
    if (params.feature === 'lesson') {
      formData.append('numLectures', numLectures);
      formData.append('lectureDuration', lectureDuration);
    }

    const response = await fetch('http://localhost:3001/api/parse-pdf', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    console.log('Raw server response:', data); // Log the full response
    if (response.ok) {
      if (params.feature === 'lesson') {
        console.log('Lesson Plan before parsing:', data.text);
        let lessonPlan = typeof data.text === 'string' ? JSON.parse(data.text) : data.text;
        console.log('Parsed lessonPlan:', lessonPlan); // Log after parsing
        setLocalPdfText(lessonPlan);
        } else if (params.feature === 'lesson') {
          console.log('Lesson Plan:', data.text);
          let lessonPlan = typeof data.text === 'string' ? JSON.parse(data.text) : data.text;
          setLocalPdfText(lessonPlan);
        } else if (params.feature === 'assignment') {
          console.log('Assignment Questions:', data.questions);
          setLocalPdfText(data.questions);
        } else {
          console.log('Extracted PDF text:', data.text);
          setLocalPdfText(data.text);
        }
      } else {
        console.error('Error from server:', data.error);
        setLocalPdfText('Error parsing PDF: ' + data.error);
      }
    } catch (error) {
      console.error('Error parsing PDF:', error);
      setLocalPdfText('Failed to extract text from PDF.');
    } finally {
      setIsParsing(false);
    }
  };

  return { pdfText, isParsing, parsePdf };
};

export default usePdfParser;