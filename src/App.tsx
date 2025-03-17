import React, { useState } from 'react';
import { Calendar, Users, UserPlus, CalendarClock } from 'lucide-react';
import CandidateList from './components/CandidateList';
import RecruiterList from './components/RecruiterList';
import InterviewList from './components/InterviewList';
import ScheduleInterview from './components/ScheduleInterview';

function App() {
  const [activeTab, setActiveTab] = useState<'candidates' | 'recruiters' | 'interviews' | 'schedule'>('candidates');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <h1 className="text-2xl font-bold text-gray-900">Interview Scheduler</h1>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('candidates')}
              className={`px-3 py-4 text-sm font-medium flex items-center space-x-2 border-b-2 ${
                activeTab === 'candidates'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Users size={20} />
              <span>Candidates</span>
            </button>

            <button
              onClick={() => setActiveTab('recruiters')}
              className={`px-3 py-4 text-sm font-medium flex items-center space-x-2 border-b-2 ${
                activeTab === 'recruiters'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <UserPlus size={20} />
              <span>Recruiters</span>
            </button>

            <button
              onClick={() => setActiveTab('interviews')}
              className={`px-3 py-4 text-sm font-medium flex items-center space-x-2 border-b-2 ${
                activeTab === 'interviews'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Calendar size={20} />
              <span>Interviews</span>
            </button>

            <button
              onClick={() => setActiveTab('schedule')}
              className={`px-3 py-4 text-sm font-medium flex items-center space-x-2 border-b-2 ${
                activeTab === 'schedule'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <CalendarClock size={20} />
              <span>Schedule Interview</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'candidates' && <CandidateList />}
        {activeTab === 'recruiters' && <RecruiterList />}
        {activeTab === 'interviews' && <InterviewList />}
        {activeTab === 'schedule' && <ScheduleInterview />}
      </main>
    </div>
  );
}

export default App;