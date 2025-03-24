"use client"
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import WorkspaceGrid from './components/WorkspaceGrid';
import ProjectList from './components/ProjectList';
import NewProjectModal from './components/NewProjectModal';
import LessonPlanningModal from './components/LessonPlanningModal';
import AssignmentModal from './components/AssignmentModal';
import FlashcardModal from './components/FlashcardModal'; // New import
import useWorkspace from './hooks/useWorkspace';

function App() {
  const [selectedWorkspace, setSelectedWorkspace] = useState(null);
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [showLessonPlanningModal, setShowLessonPlanningModal] = useState(false);
  const [showAssignmentModal, setShowAssignmentModal] = useState(false);
  const [showFlashcardModal, setShowFlashcardModal] = useState(false); // New state
  const [numLectures, setNumLectures] = useState(1);
  const [lectureDuration, setLectureDuration] = useState(60);
  const [assignmentDifficulty, setAssignmentDifficulty] = useState('medium');
  const [assignmentInstructions, setAssignmentInstructions] = useState('');
  const [numQuestions, setNumQuestions] = useState(10);
  const [flashcardInstructions, setFlashcardInstructions] = useState(''); // New state

  const { workspaces, currentWorkspace } = useWorkspace(selectedWorkspace);

  const handleLessonPlanSubmit = () => {
    setShowLessonPlanningModal(false);
    setShowNewProjectModal(false);
    window.open(`/services/lesson?lectures=${numLectures}&duration=${lectureDuration}`, '_blank');
  };

  const handleAssignmentSubmit = () => {
    setShowAssignmentModal(false);
    setShowNewProjectModal(false);
    window.open(
      `/services/assignment?difficulty=${assignmentDifficulty}&questions=${numQuestions}&instructions=${encodeURIComponent(
        assignmentInstructions
      )}`,
      '_blank'
    );
  };

  const handleFlashcardSubmit = () => {
    setShowFlashcardModal(false);
    setShowNewProjectModal(false);
    window.open(
      `/services/flashcards?instructions=${encodeURIComponent(flashcardInstructions)}`,
      '_blank'
    );
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
              onNewProject={() => setShowNewProjectModal(true)}
            />
          ) : (
            <WorkspaceGrid workspaces={workspaces} onSelect={setSelectedWorkspace} />
          )}
        </div>
      </div>
      <NewProjectModal
        isOpen={showNewProjectModal}
        onClose={() => setShowNewProjectModal(false)}
        onLessonPlanning={() => setShowLessonPlanningModal(true)}
        onAssignment={() => setShowAssignmentModal(true)}
        onFlashcards={() => setShowFlashcardModal(true)} // New prop
      />
      <LessonPlanningModal
        isOpen={showLessonPlanningModal}
        onClose={() => setShowLessonPlanningModal(false)}
        numLectures={numLectures}
        setNumLectures={setNumLectures}
        lectureDuration={lectureDuration}
        setLectureDuration={setLectureDuration}
        onSubmit={handleLessonPlanSubmit}
      />
      <AssignmentModal
        isOpen={showAssignmentModal}
        onClose={() => setShowAssignmentModal(false)}
        assignmentDifficulty={assignmentDifficulty}
        setAssignmentDifficulty={setAssignmentDifficulty}
        numQuestions={numQuestions}
        setNumQuestions={setNumQuestions}
        assignmentInstructions={assignmentInstructions}
        setAssignmentInstructions={setAssignmentInstructions}
        onSubmit={handleAssignmentSubmit}
      />
      <FlashcardModal
        isOpen={showFlashcardModal}
        onClose={() => setShowFlashcardModal(false)}
        flashcardInstructions={flashcardInstructions}
        setFlashcardInstructions={setFlashcardInstructions}
        onSubmit={handleFlashcardSubmit}
      />
    </div>
  );
}

export default App;