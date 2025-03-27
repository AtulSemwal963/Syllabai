import FlashcardsView from "./FlashcardsView";
import LessonView from "./LessonView";
import AssignmentView from "./AssignmentView";
import PresentationView from "./PresentationView";
import DefaultView from "./DefaultView";

export default function ContentViewer({
  feature,
  pdfText,
  flippedCards,
  toggleFlip,
  openAccordion,
  toggleAccordion,
  difficulty,
  onDownloadPresentation,
  pptxFile,
}) {
  // Determine whether there is content to show
  const hasContent = pdfText || (feature === "presentation" && pptxFile);

  if (!hasContent) {
    return <p className="text-gray-600">No content extracted yet.</p>;
  }

  const views = {
    flashcards: (
      <FlashcardsView
        pdfText={pdfText}
        flippedCards={flippedCards}
        toggleFlip={toggleFlip}
      />
    ),
    lesson: (
      <LessonView
        pdfText={pdfText}
        openAccordion={openAccordion}
        toggleAccordion={toggleAccordion}
      />
    ),
    assignment: <AssignmentView pdfText={pdfText} difficulty={difficulty} />,
    presentation: (
      <PresentationView
        pptxFile={pptxFile} // Pass the PPTX file URL
        onDownload={onDownloadPresentation} // Pass the download handler
      />
    ),
  };

  return views[feature] || <DefaultView pdfText={pdfText} />;
}
