"use client";
import React, { useState, useCallback } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import WorkspaceGrid from "./components/WorkspaceGrid";
import ProjectList from "./components/ProjectList";
import NewProjectModal from "./components/NewProjectModal";
import LessonPlanningModal from "./components/LessonPlanningModal";
import AssignmentModal from "./components/AssignmentModal";
import FlashcardModal from "./components/FlashcardModal";
import PresentationGeneratorModal from "./components/PresentationGeneratorModal";
import useWorkspace from "./hooks/useWorkspace";

function App() {
  const [selectedWorkspace, setSelectedWorkspace] = useState(null);
  const [modals, setModals] = useState({
    newProject: false,
    lessonPlanning: false,
    assignment: false,
    flashcards: false,
    presentation: false,
  });
  
  const [lessonSettings, setLessonSettings] = useState({ numLectures: 1, lectureDuration: 60 });
  const [assignmentSettings, setAssignmentSettings] = useState({ difficulty: "medium", questions: 10, instructions: "" });
  const [flashcardInstructions, setFlashcardInstructions] = useState("");
  const [presentationSettings, setPresentationSettings] = useState({
    generationType: "standard",
    numSlides: 10,
    slides: [],
    instructions: "",
  });

  const { workspaces, currentWorkspace } = useWorkspace(selectedWorkspace);

  const toggleModal = useCallback((modal, state) => {
    setModals((prev) => ({ ...prev, [modal]: state }));
  }, []);

  const openService = (url) => {
    toggleModal("newProject", false);
    window.open(url, "_blank");
  };

  const handleLessonPlanSubmit = () => {
    toggleModal("lessonPlanning", false);
    openService(`/services/lesson?lectures=${lessonSettings.numLectures}&duration=${lessonSettings.lectureDuration}`);
  };

  const handleAssignmentSubmit = () => {
    toggleModal("assignment", false);
    openService(
      `/services/assignment?difficulty=${assignmentSettings.difficulty}&questions=${assignmentSettings.questions}&instructions=${encodeURIComponent(assignmentSettings.instructions)}`
    );
  };

  const handleFlashcardSubmit = () => {
    toggleModal("flashcards", false);
    openService(`/services/flashcards?instructions=${encodeURIComponent(flashcardInstructions)}`);
  };

  const handlePresentationSubmit = (data) => {
    toggleModal("presentation", false);
    setPresentationSettings(data);
    const params = new URLSearchParams({
      type: data.generationType,
      ...(data.generationType === "custom" && {
        numSlides: data.numSlides,
        slides: JSON.stringify(data.slides),
        instructions: encodeURIComponent(data.instructions),
      }),
    });
    openService(`/services/presentation?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <div className="flex-1">
        <Header
          selectedWorkspace={selectedWorkspace}
          setSelectedWorkspace={setSelectedWorkspace}
          currentWorkspace={currentWorkspace}
        />
        <div className="p-6">
          {selectedWorkspace ? (
            <ProjectList
              projects={currentWorkspace?.projects}
              onNewProject={() => toggleModal("newProject", true)}
            />
          ) : (
            <WorkspaceGrid workspaces={workspaces} onSelect={setSelectedWorkspace} />
          )}
        </div>
      </div>

      <NewProjectModal
        isOpen={modals.newProject}
        onClose={() => toggleModal("newProject", false)}
        onLessonPlanning={() => toggleModal("lessonPlanning", true)}
        onAssignment={() => toggleModal("assignment", true)}
        onFlashcards={() => toggleModal("flashcards", true)}
        onPresentation={() => toggleModal("presentation", true)}
      />

      <LessonPlanningModal
        isOpen={modals.lessonPlanning}
        onClose={() => toggleModal("lessonPlanning", false)}
        numLectures={lessonSettings.numLectures}
        setNumLectures={(value) => setLessonSettings((prev) => ({ ...prev, numLectures: value }))}
        lectureDuration={lessonSettings.lectureDuration}
        setLectureDuration={(value) => setLessonSettings((prev) => ({ ...prev, lectureDuration: value }))}
        onSubmit={handleLessonPlanSubmit}
      />

      <AssignmentModal
        isOpen={modals.assignment}
        onClose={() => toggleModal("assignment", false)}
        assignmentDifficulty={assignmentSettings.difficulty}
        setAssignmentDifficulty={(value) => setAssignmentSettings((prev) => ({ ...prev, difficulty: value }))}
        numQuestions={assignmentSettings.questions}
        setNumQuestions={(value) => setAssignmentSettings((prev) => ({ ...prev, questions: value }))}
        assignmentInstructions={assignmentSettings.instructions}
        setAssignmentInstructions={(value) => setAssignmentSettings((prev) => ({ ...prev, instructions: value }))}
        onSubmit={handleAssignmentSubmit}
      />

      <FlashcardModal
        isOpen={modals.flashcards}
        onClose={() => toggleModal("flashcards", false)}
        flashcardInstructions={flashcardInstructions}
        setFlashcardInstructions={setFlashcardInstructions}
        onSubmit={handleFlashcardSubmit}
      />

      <PresentationGeneratorModal
        isOpen={modals.presentation}
        onClose={() => toggleModal("presentation", false)}
        generationType={presentationSettings.generationType}
        setGenerationType={(value) => setPresentationSettings((prev) => ({ ...prev, generationType: value }))}
        numSlides={presentationSettings.numSlides}
        setNumSlides={(value) => setPresentationSettings((prev) => ({ ...prev, numSlides: value }))}
        slides={presentationSettings.slides}
        setSlides={(value) => setPresentationSettings((prev) => ({ ...prev, slides: value }))}
        presentationInstructions={presentationSettings.instructions}
        setPresentationInstructions={(value) => setPresentationSettings((prev) => ({ ...prev, instructions: value }))}
        onSubmit={handlePresentationSubmit}
      />
    </div>
  );
}

export default App;