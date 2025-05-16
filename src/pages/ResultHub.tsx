import React, { useState } from 'react';

const ResultHub = () => {
  const [selectedTerm, setSelectedTerm] = useState('1');
  const [selectedYear, setSelectedYear] = useState('2023');

  // Sample local results data
  const sampleResults = {
    '2023': {
      '1': [
        { subject: 'Mathematics', grade: 'A', score: 92, remarks: 'Excellent performance' },
        { subject: 'English', grade: 'B+', score: 87, remarks: 'Good, needs more reading' },
        { subject: 'Physics', grade: 'A-', score: 90, remarks: 'Very good understanding' },
        { subject: 'Chemistry', grade: 'B', score: 83, remarks: 'Satisfactory' },
        { subject: 'Biology', grade: 'A', score: 94, remarks: 'Outstanding work' },
      ],
      '2': [
        { subject: 'Mathematics', grade: 'A', score: 95, remarks: 'Perfect score!' },
        { subject: 'English', grade: 'A-', score: 89, remarks: 'Great improvement' },
        { subject: 'Physics', grade: 'A', score: 93, remarks: 'Excellent work' },
        { subject: 'Chemistry', grade: 'B+', score: 86, remarks: 'Good progress' },
        { subject: 'Biology', grade: 'A', score: 96, remarks: 'Top of class' },
      ],
    },
    '2022': {
      '1': [
        { subject: 'Mathematics', grade: 'B+', score: 85, remarks: 'Good effort' },
        { subject: 'English', grade: 'B', score: 82, remarks: 'Average performance' },
        { subject: 'Physics', grade: 'B+', score: 87, remarks: 'Shows potential' },
        { subject: 'Chemistry', grade: 'C+', score: 78, remarks: 'Needs improvement' },
        { subject: 'Biology', grade: 'A-', score: 89, remarks: 'Very good' },
      ],
      '2': [
        { subject: 'Mathematics', grade: 'A-', score: 90, remarks: 'Significant improvement' },
        { subject: 'English', grade: 'B+', score: 86, remarks: 'Better participation needed' },
        { subject: 'Physics', grade: 'A-', score: 89, remarks: 'Excellent progress' },
        { subject: 'Chemistry', grade: 'B', score: 83, remarks: 'Working hard' },
        { subject: 'Biology', grade: 'A', score: 92, remarks: 'Exceptional work' },
      ],
    },
  };

  const currentResults = sampleResults[selectedYear]?.[selectedTerm] || [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white pb-20">
      {/* Header */}
      <div className="pt-6 px-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2 flex items-center">
          <svg className="w-6 h-6 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          Results Hub
        </h1>
        <p className="text-indigo-400 text-sm">Track your academic performance</p>
      </div>

      {/* Filters */}
      <div className="bg-white mx-6 mt-6 p-4 rounded-xl shadow-sm">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-gray-500 font-medium mb-1">Grade</label>
            <select 
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
            >
              <option value="2023">Grade 11</option>
              <option value="2022">Grade 10</option>
              <option value="2021">Grade 9</option>
            </select>
          </div>
          <div>
            <label className="block text-xs text-gray-500 font-medium mb-1">Term</label>
            <select 
              value={selectedTerm}
              onChange={(e) => setSelectedTerm(e.target.value)}
              className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
            >
              <option value="1">Term 1</option>
              <option value="2">Term 2</option>
              <option value="3">Term 3</option>
              <option value="3">Overall</option>
            </select>
          </div>
        </div>
      </div>

      {/* Summary Card */}
      <div className="mx-6 mt-6 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white p-5 rounded-xl shadow-md">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm opacity-80">Overall Performance</p>
            <h2 className="text-2xl font-bold mt-1">
              {currentResults.length > 0 ? 
                currentResults.reduce((acc: any, curr: any) => acc + curr.score, 0) / currentResults.length + '%' : 
                'N/A'}
            </h2>
            <div className='flex gap-3'>
            <p className="text-sm mt-1">
              Total: <span className='font-black text-white'>567</span> 
            </p>
            <p className="text-sm mt-1">
              Position: <span className='font-black text-white'>5/42</span>
            </p>
            </div>
          </div>
          <div className="bg-white/20 p-3 rounded-full">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
        </div>
      </div>

      {/* Results List */}
      <div className="mx-6 mt-6 space-y-3">
        <h3 className="font-medium text-gray-700 flex items-center">
          <svg className="w-4 h-4 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          Subject Results
        </h3>
        
        {currentResults.length > 0 ? (
          currentResults.map((result: any, index: number) => (
            <div key={index} className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition duration-200">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium text-gray-800">{result.subject}</h4>
                  <p className="text-xs text-gray-500 mt-1">{result.remarks}</p>
                </div>
                <div className="text-right">
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                    result.grade === 'A' ? 'bg-green-100 text-green-800' :
                    result.grade.startsWith('A') ? 'bg-blue-100 text-blue-800' :
                    result.grade.startsWith('B') ? 'bg-indigo-100 text-indigo-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {result.grade}
                  </span>
                  <p className="text-lg font-bold mt-1">{result.score}%</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <svg className="w-10 h-10 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="mt-3 text-gray-500">No results available for this term</p>
          </div>
        )}
      </div>

      {/* Download Button */}
      {currentResults.length > 0 && (
        <div className="fixed bottom-6 left-6 right-6">
          <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg shadow-md transition duration-200 flex items-center justify-center">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download Full Report
          </button>
        </div>
      )}
    </div>
  );
};

export default ResultHub;