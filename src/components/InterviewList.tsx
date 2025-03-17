import React, { useState, useEffect } from 'react';
import { Interview, Candidate, Recruiter } from '../types';

export default function InterviewList() {
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [candidates, setCandidates] = useState<Record<string, Candidate>>({});
  const [recruiters, setRecruiters] = useState<Record<string, Recruiter>>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [interviewsRes, candidatesRes, recruitersRes] = await Promise.all([
          fetch('/api/interviews'),
          fetch('/api/candidates'),
          fetch('/api/recruiters')
        ]);

        const [interviewsData, candidatesData, recruitersData] = await Promise.all([
          interviewsRes.json(),
          candidatesRes.json(),
          recruitersRes.json()
        ]);

        setInterviews(interviewsData);
        setCandidates(candidatesData.reduce((acc: Record<string, Candidate>, curr: Candidate) => {
          acc[curr.id] = curr;
          return acc;
        }, {}));
        setRecruiters(recruitersData.reduce((acc: Record<string, Recruiter>, curr: Recruiter) => {
          acc[curr.id] = curr;
          return acc;
        }, {}));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Scheduled Interviews</h2>
      
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Candidate</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recruiter</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {interviews.map((interview) => {
              const candidate = candidates[interview.candidate_id];
              const recruiter = recruiters[interview.recruiter_id];
              
              return (
                <tr key={interview.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{candidate?.name}</div>
                    <div className="text-sm text-gray-500">{candidate?.position}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{recruiter?.name}</div>
                    <div className="text-sm text-gray-500">{recruiter?.specialization}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(interview.datetime).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      interview.status === 'scheduled'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {interview.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}