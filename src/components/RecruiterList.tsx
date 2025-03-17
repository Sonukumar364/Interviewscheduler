import React, { useState, useEffect } from 'react';
import { Recruiter } from '../types';
import { UserPlus } from 'lucide-react';

export default function RecruiterList() {
  const [recruiters, setRecruiters] = useState<Recruiter[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newRecruiter, setNewRecruiter] = useState({
    name: '',
    email: '',
    specialization: '',
    availability: ['']
  });

  useEffect(() => {
    // Fetch recruiters from your API
    const fetchRecruiters = async () => {
      try {
        const response = await fetch('/api/recruiters');
        const data = await response.json();
        setRecruiters(data);
      } catch (error) {
        console.error('Error fetching recruiters:', error);
      }
    };

    fetchRecruiters();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/recruiters', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRecruiter),
      });
      const data = await response.json();
      setRecruiters([...recruiters, data]);
      setShowAddForm(false);
      setNewRecruiter({ name: '', email: '', specialization: '', availability: [''] });
    } catch (error) {
      console.error('Error adding recruiter:', error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Recruiters</h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <UserPlus className="h-5 w-5 mr-2" />
          Add Recruiter
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                value={newRecruiter.name}
                onChange={(e) => setNewRecruiter({ ...newRecruiter, name: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={newRecruiter.email}
                onChange={(e) => setNewRecruiter({ ...newRecruiter, email: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Specialization</label>
              <select
                value={newRecruiter.specialization}
                onChange={(e) => setNewRecruiter({ ...newRecruiter, specialization: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              >
                <option value="">Select a specialization</option>
                <option value="Engineering">Engineering</option>
                <option value="Product">Product</option>
                <option value="Design">Design</option>
                <option value="Operation">Operation</option>
                <option value="SDE">SDE</option>
                <option value="Financial Analyst">Financial Analyst</option>
                <option value="Web Developer">Web Developer</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Availability</label>
              <input
                type="datetime-local"
                value={newRecruiter.availability[0]}
                onChange={(e) => setNewRecruiter({ ...newRecruiter, availability: [e.target.value] })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      )}

      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Specialization</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Availability</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {recruiters.map((recruiter) => (
              <tr key={recruiter.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{recruiter.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{recruiter.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{recruiter.specialization}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {recruiter.availability.map((time) => (
                    <div key={time}>{new Date(time).toLocaleString()}</div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}