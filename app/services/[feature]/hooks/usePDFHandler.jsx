import { useState, useEffect } from "react";

export default function usePDFHandler(params) {
  console.log("usePDFHandler Initial Params:", params);

  const [pdfFile, setPdfFile] = useState(null);
  const [pptxFile, setPptxFile] = useState(null);
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [pdfText, setPdfText] = useState(null);
  const [isParsing, setIsParsing] = useState(false);

  // Cleanup previous blob URLs to prevent memory leaks
  useEffect(() => {
    return () => {
      if (pptxFile?.url) {
        window.URL.revokeObjectURL(pptxFile.url);
      }
    };
  }, [pptxFile]);

  const validateOptions = (feature, options) => {
    const required = {
      presentation: ["type"],
      lesson: ["numLectures", "lectureDuration"],
      assignment: ["difficulty", "questions"],
      flashcards: [],
      summarization: [],
    };
    const missing = (required[feature] || []).filter(key => !(key in options));
    if (missing.length > 0) {
      console.warn(`Missing required options for ${feature}:`, missing);
    }
    return options;
  };

  const parsePdf = async (file, options) => {
    console.log("parsePdf Options:", options);
    const validatedOptions = validateOptions(params.feature, options);

    try {
      const formData = new FormData();
      formData.append("pdf", file);
      formData.append("feature", params.feature || "lesson");

      Object.entries(validatedOptions).forEach(([key, value]) => {
        formData.append(key, value);
      });

      console.log("FormData Sent to Backend:", Object.fromEntries(formData.entries()));

      const response = await fetch("http://localhost:3001/api/parse-pdf", {
        method: "POST",
        body: formData,
      });

      if (params.feature === "presentation") {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
      
        // Revoke old URL before setting a new one
        if (pptxFile?.url) {
          window.URL.revokeObjectURL(pptxFile.url);
        }
      
        setPptxFile({ blob, filename: "generated_presentation.pptx", url });
        console.log("PPTX File Set:", { blob, url });
        return;
      }
      

      const data = await response.json();
      if (response.ok) {
        handlePdfResponse(data, params.feature);
      } else {
        console.error("Error from server:", data.error);
        setPdfText("Error parsing PDF: " + data.error);
      }
    } catch (error) {
      console.error("Error parsing PDF:", error);
      setPdfText("Failed to extract text from PDF.");
    }
  };

  const handlePdfResponse = (data, feature) => {
    switch (feature) {
      case "summarization":
        setPdfText(data.text);
        break;
      case "lesson":
        setPdfText(typeof data.text === "string" ? JSON.parse(data.text) : data.text);
        break;
      case "assignment":
        setPdfText(data.questions);
        break;
      case "flashcards":
        const flashcards = data.flashcards || (Array.isArray(data) ? data : []);
        setPdfText(flashcards);
        break;
      case "presentation":
        const slides = data.slides || (Array.isArray(data) ? data : []);
        setPdfText(slides);
        break;
      default:
        setPdfText(data.text);
    }
  };

  const onFileChange = async (event, options) => {
    console.log("onFileChange Options:", options);
    const file = event.target.files?.[0];
    if (file) {
      setPdfFile(file);
      setPageNumber(1);
      setIsParsing(true);
      await parsePdf(file, options);
      setIsParsing(false);
    }
  };

  const downloadPptx = () => {
    if (pptxFile) {
      const a = document.createElement("a");
      a.href = pptxFile;
      a.download = "generated_presentation.pptx";
      document.body.appendChild(a);
      a.click();
      a.remove();
    }
  };

  const changePage = (offset) => {
    setPageNumber((prev) => Math.min(Math.max(1, prev + offset), numPages));
  };

  return {
    pdfFile,
    pptxFile,
    setPptxFile, // Exposing this for better state management
    setPdfFile,
    numPages,
    setNumPages,
    pageNumber,
    setPageNumber,
    pdfText,
    setPdfText,
    isParsing,
    setIsParsing,
    onFileChange,
    changePage,
    downloadPptx,
  };
}
