import React, { useState, useEffect } from 'react';
import { Candidate, Recruiter } from '../types';

export default function ScheduleInterview() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [recruiters, setRecruiters] = useState<Recruiter[]>([]);
  const [selectedCandidate, setSelectedCandidate] = useState('');
  const [selectedRecruiter, setSelectedRecruiter] = useState('');
  const [selectedDateTime, setSelectedDateTime] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [candidatesRes, recruitersRes] = await Promise.all([
          fetch('/api/candidates'),
          fetch('/api/recruiters')
        ]);

        const [candidatesData, recruitersData] = await Promise.all([
          candidatesRes.json(),
          recruitersRes.json()
        ]);

        setCandidates(candidatesData);
        setRecruiters(recruitersData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/interviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          candidate_id: selectedCandidate,
          recruiter_id: selectedRecruiter,
          datetime: selectedDateTime,
        }),
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'Interview scheduled successfully!' });
        setSelectedCandidate('');
        setSelectedRecruiter('');
        setSelectedDateTime('');
      } else {
        const error = await response.json();
        setMessage({ type: 'error', text: error.message || 'Failed to schedule interview' });
      }
    } catch (error) {
      console.error('Error scheduling interview:', error);
      setMessage({ type: 'error', text: 'Failed to schedule interview' });
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Schedule New Interview</h2>

      {message.text && (
        <div
          className={`p-4 mb-6 rounded-md ${
            message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Candidate
          </label>
          <select
            value={selectedCandidate}
            onChange={(e) => setSelectedCandidate(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          >
            <option value="">Choose a candidate</option>
            {candidates.map((candidate) => (
              <option key={candidate.id} value={candidate.id}>
                {candidate.name} - {candidate.position}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Recruiter
          </label>
          <select
            value={selectedRecruiter}
            onChange={(e) => setSelectedRecruiter(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          >
            <option value="">Choose a recruiter</option>
            {recruiters.map((recruiter) => (
              <option key={recruiter.id} value={recruiter.id}>
                {recruiter.name} - {recruiter.specialization}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Date & Time
          </label>
          <input
            type="datetime-local"
            value={selectedDateTime}
            onChange={(e) => setSelectedDateTime(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Schedule Interview
          </button>
        </div>
      </form>
    </div>
  );
}