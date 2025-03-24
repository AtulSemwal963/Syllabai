import React, { useState } from 'react';
import { Layout, LayoutGrid, Plus, Search, Settings, Users, FileText, Database, ChevronLeft, MoreHorizontal, X, BookOpen, PenTool, Brain, Car as Cards, Presentation } from 'lucide-react';
import Link from 'next/link';

function App() {
  const [selectedWorkspace, setSelectedWorkspace] = useState(null);
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [showLessonPlanningModal, setShowLessonPlanningModal] = useState(false);
  const [showAssignmentModal, setShowAssignmentModal] = useState(false);
  const [numLectures, setNumLectures] = useState(1);
  const [lectureDuration, setLectureDuration] = useState(60);
  const [assignmentDifficulty, setAssignmentDifficulty] = useState('medium');
  const [assignmentInstructions, setAssignmentInstructions] = useState('');
  const [numQuestions, setNumQuestions] = useState(10);

  const workspaces = [
    {
      id: '1',
      name: 'Grade 5 Science',
      creator: 'Sarah Johnson',
      createdAt: '2024-02-15',
      projects: [
        {
          id: '1',
          name: 'Biology Fundamentals',
          type: 'lesson',
          owner: 'Sarah Johnson',
          lastModified: '2024-03-10 14:30'
        },
        {
          id: '2',
          name: 'Chemistry Basics Assessment',
          type: 'assessment',
          owner: 'Sarah Johnson',
          lastModified: '2024-03-09 11:20'
        }
      ]
    },
    {
      id: '2',
      name: 'Grade 6 Math',
      creator: 'Michael Chen',
      createdAt: '2024-03-01',
      projects: [
        {
          id: '3',
          name: 'Algebra Introduction',
          type: 'lesson',
          owner: 'Sarah Johnson',
          lastModified: '2024-03-08 09:15'
        }
      ]
    }
  ];

  const currentWorkspace = workspaces.find(w => w.id === selectedWorkspace);

  const projectTypes = [
    {
      type: 'lesson',
      name: 'Lesson Planning',
      description: 'Create detailed lesson plans with objectives, activities, and resources',
      icon: BookOpen
    },
    {
      type: 'assignment',
      name: 'Assignments',
      description: 'Generate quizzes, tests, and homework assignments',
      icon: PenTool
    },
    {
      type: 'summarization',
      name: 'Summarization',
      description: 'Create concise summaries and study materials',
      icon: Brain
    },
    {
      type: 'flashcards',
      name: 'Flashcard Generation',
      description: 'Generate interactive flashcards for effective memorization and review',
      icon: Cards
    },
    {
      type: 'presentation',
      name: 'Presentation Generator',
      description: 'Create engaging slide presentations with key points and visuals',
      icon: Presentation
    }
  ];

  const handleLessonPlanningClick = () => {
    setShowLessonPlanningModal(true);
  };

  const handleAssignmentClick = () => {
    setShowAssignmentModal(true);
  };

  const handleLessonPlanSubmit = () => {
    setShowLessonPlanningModal(false);
    setShowNewProjectModal(false);
    window.open(`/services/lesson?lectures=${numLectures}&duration=${lectureDuration}`, '_blank');
  };

  const handleAssignmentSubmit = () => {
    setShowAssignmentModal(false);
    setShowNewProjectModal(false);
    window.open(`/services/assignment?difficulty=${assignmentDifficulty}&questions=${numQuestions}&instructions=${encodeURIComponent(assignmentInstructions)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-16 bg-white border-r border-gray-200 flex flex-col items-center py-4 space-y-6">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <Layout className="w-5 h-5 text-white" />
        </div>
        <button className="p-2 hover:bg-gray-100 rounded-lg">
          <LayoutGrid className="w-5 h-5 text-gray-600" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-lg">
          <Users className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {selectedWorkspace && (
                <button 
                  onClick={() => setSelectedWorkspace(null)}
                  className="p-1 hover:bg-gray-100 rounded-lg mr-2"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-600" />
                </button>
              )}
              <h1 className="text-xl font-semibold text-gray-800">
                {currentWorkspace ? currentWorkspace.name : 'All Workspaces'}
              </h1>
              <button className="px-3 py-1.5 bg-yellow-400 text-sm font-medium rounded-md hover:bg-yellow-500">
                Update
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search"
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Settings className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          <div className="flex space-x-6 mt-6">
            <button className="text-gray-800 border-b-2 border-gray-800 px-1 py-2">All</button>
            <button className="text-gray-500 px-1 py-2">Content</button>
            <button className="text-gray-500 px-1 py-2">Datasets</button>
          </div>
        </header>

        {/* Content */}
        <div className="p-6">
          {!selectedWorkspace ? (
            <div className="grid grid-cols-3 gap-6">
              {workspaces.map(workspace => (
                <button
                  key={workspace.id}
                  onClick={() => setSelectedWorkspace(workspace.id)}
                  className="bg-white p-6 rounded-lg border border-gray-200 hover:border-blue-500 transition-colors text-left"
                >
                  <h3 className="text-lg font-medium text-gray-800">{workspace.name}</h3>
                  <div className="mt-2 space-y-1">
                    <p className="text-sm text-gray-500">{workspace.projects.length} projects</p>
                    <p className="text-sm text-gray-500">Created by {workspace.creator}</p>
                    <p className="text-sm text-gray-500">Created on {workspace.createdAt}</p>
                  </div>
                </button>
              ))}
              <button className="bg-gray-50 p-6 rounded-lg border border-dashed border-gray-300 hover:border-blue-500 transition-colors flex items-center justify-center">
                <Plus className="w-6 h-6 text-gray-400" />
                <span className="ml-2 text-gray-600">New Workspace</span>
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {currentWorkspace?.projects.map(project => (
                <div
                  key={project.id}
                  className="bg-white p-4 rounded-lg border border-gray-200 flex items-center"
                >
                  <div className="p-2 bg-blue-50 rounded-lg">
                    {project.type === 'lesson' ? (
                      <FileText className="w-6 h-6 text-blue-600" />
                    ) : project.type === 'assignment' ? (
                      <Database className="w-6 h-6 text-blue-600" />
                    ) : (
                      <Layout className="w-6 h-6 text-blue-600" />
                    )}
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="text-lg font-medium text-gray-800">{project.name}</h3>
                    <p className="text-sm text-gray-500">Last modified: {project.lastModified}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-500">{project.owner}</span>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <MoreHorizontal className="w-5 h-5 text-gray-400" />
                    </button>
                  </div>
                </div>
              ))}
              <button 
                onClick={() => setShowNewProjectModal(true)}
                className="w-full bg-gray-50 p-4 rounded-lg border border-dashed border-gray-300 hover:border-blue-500 transition-colors flex items-center justify-center"
              >
                <Plus className="w-6 h-6 text-gray-400" />
                <span className="ml-2 text-gray-600">New Project</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* New Project Modal */}
      {showNewProjectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg w-[800px] p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Create New Project</h2>
              <button 
                onClick={() => setShowNewProjectModal(false)}
                className="p-1 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {projectTypes.map((type) => (
                type.type === 'lesson' ? (
                  <button
                    key={type.type}
                    className="group p-6 border border-gray-200 rounded-lg hover:border-blue-500 transition-colors text-left bg-white hover:bg-blue-50"
                    onClick={handleLessonPlanningClick}
                  >
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                        <type.icon className="w-8 h-8 text-blue-600" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-800">{type.name}</h3>
                    </div>
                    <p className="text-sm text-gray-600">{type.description}</p>
                  </button>
                ) : type.type === 'assignment' ? (
                  <button
                    key={type.type}
                    className="group p-6 border border-gray-200 rounded-lg hover:border-blue-500 transition-colors text-left bg-white hover:bg-blue-50"
                    onClick={handleAssignmentClick}
                  >
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                        <type.icon className="w-8 h-8 text-blue-600" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-800">{type.name}</h3>
                    </div>
                    <p className="text-sm text-gray-600">{type.description}</p>
                  </button>
                ) : (
                  <Link href={`/services/${type.type}`} target="_blank" key={type.type}>
                    <button
                      className="group p-6 border border-gray-200 rounded-lg hover:border-blue-500 transition-colors text-left bg-white hover:bg-blue-50"
                      onClick={() => setShowNewProjectModal(false)}
                    >
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                          <type.icon className="w-8 h-8 text-blue-600" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-800">{type.name}</h3>
                      </div>
                      <p className="text-sm text-gray-600">{type.description}</p>
                    </button>
                  </Link>
                )
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Lesson Planning Modal */}
      {showLessonPlanningModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
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
                onClick={() => setShowLessonPlanningModal(false)}
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

      {/* Assignment Modal */}
      {showAssignmentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Set Assignment Details</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Difficulty Level
              </label>
              <select
                value={assignmentDifficulty}
                onChange={(e) => setAssignmentDifficulty(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Number of Questions
              </label>
              <input
                type="number"
                min="1"
                max="100"
                value={numQuestions}
                onChange={(e) => setNumQuestions(Math.max(1, Math.min(100, parseInt(e.target.value))))}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Additional Instructions
              </label>
              <textarea
                value={assignmentInstructions}
                onChange={(e) => setAssignmentInstructions(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md p-2 h-32 resize-y"
                placeholder="Enter any specific instructions..."
              />
            </div>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowAssignmentModal(false)}
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleAssignmentSubmit}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Set
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;