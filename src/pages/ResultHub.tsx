import React, { useEffect, useState } from 'react';
import { useAuth, useData } from '../context/context';
import type { AppData, Classroom, Term } from '../types';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface SubjectResult {
  subject_id: string;
  subject_name: string;
  result: number;
  class_id: string;
  class_display: string;
}

interface ResultsData {
  student_info: {
    std_id: string;
    full_name: string;
    grade: number;
    portrait: string;
  };
  result_data: {
    subjects_count: string;
    total_marks: string;
    average_mark: string;
    rank: string;
    subjects_results: SubjectResult[];
  };
}

const ResultHub = () => {
  const token = useAuth();
  const [selectedTerm, setSelectedTerm] = useState<string>('');
  const [selectedClass, setSelectedClass] = useState<string>('');
  const [results, setResults] = useState<ResultsData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const data = useData() as { data?: AppData };

  // Transform class data to use 'grade' instead of 'class'
  const transformClassToGrade = (classData: any): Classroom => {
    return {
      class_id: classData.class_id,
      grade: classData.class || classData.grade, // Handle both cases
      section: classData.section
    };
  };

  useEffect(() => {
    if (data.data) {
      if (data.data.terms.length > 0 && !selectedTerm) {
        setSelectedTerm(data.data.terms[0].term_id);
      }
      if (data.data.student_info.class_id && !selectedClass) {
        setSelectedClass(data.data.student_info.class_id);
      }
    }
  }, [data.data, selectedTerm, selectedClass]);

  useEffect(() => {
    const fetchResults = async () => {
      if (!selectedTerm || !selectedClass) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(
          `http://localhost:3000/api/student/data/${selectedClass}/${selectedTerm}`,
          {
            headers: {
              'Authorization': `Bearer ${token?.token}`
            }
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch results');
        }

        const resultData = await response.json();
        setResults(resultData.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [selectedTerm, selectedClass, token]);

  if (!data.data) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white p-6">
        <Skeleton height={30} width={200} />
        <div className="mt-6">
          <Skeleton height={100} count={3} className="mb-4" />
        </div>
      </div>
    );
  }

  const { student_info, terms, attendedClasses } = data.data;
  
  let allClasses = [
    transformClassToGrade(student_info.current_class),
    ...attendedClasses
      .filter((c: Classroom) => c.class_id !== student_info.current_class.class_id)
      .map(transformClassToGrade)
  ];

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

      {/* Student Info */}
      <div className="mx-6 mt-6 bg-white p-4 rounded-xl shadow-sm flex items-center">
        {loading ? (
          <Skeleton circle width={64} height={64} />
        ) : (
          <img 
            src={results?.student_info.portrait || student_info.portrait} 
            alt={results?.student_info.full_name || student_info.full_name}
            className="w-16 h-16 rounded-full object-cover"
          />
        )}
        <div className="ml-4">
          {loading ? (
            <>
              <Skeleton width={150} height={20} />
              <Skeleton width={100} height={16} className="mt-1" />
              <Skeleton width={120} height={16} className="mt-1" />
            </>
          ) : (
            <>
              <h2 className="font-bold text-gray-800">
                {results?.student_info.full_name || student_info.full_name}
              </h2>
              <p className="text-sm text-gray-600">
                ID: {results?.student_info.std_id || student_info.std_id}
              </p>
              <p className="text-sm text-gray-600">
                Grade: {results?.student_info.grade || student_info.grade}
              </p>
            </>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white mx-6 mt-6 p-4 rounded-xl shadow-sm">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-gray-500 font-medium mb-1">Class</label>
            <select 
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
              disabled={loading}
            >
              {allClasses.map((classItem) => (
                <option key={classItem.class_id} value={classItem.class_id}>
                  Grade {classItem.grade}{classItem.section}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs text-gray-500 font-medium mb-1">Term</label>
            <select 
              value={selectedTerm}
              onChange={(e) => setSelectedTerm(e.target.value)}
              className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
              disabled={loading}
            >
              {terms.map((term: Term) => (
                <option key={term.term_id} value={term.term_id}>
                  Term {term.index}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mx-6 mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* Summary Card */}
      <div className="mx-6 mt-6 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white p-5 rounded-xl shadow-md">
        {loading ? (
          <div className="flex justify-between items-center">
            <div>
              <Skeleton width={150} height={20} />
              <Skeleton width={80} height={28} className="mt-2" />
              <div className="flex gap-3 mt-2">
                <Skeleton width={80} height={20} />
                <Skeleton width={80} height={20} />
              </div>
            </div>
            <Skeleton circle width={42} height={42} />
          </div>
        ) : results ? (
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm opacity-80">Overall Performance</p>
              <h2 className="text-2xl font-bold mt-1">
                {parseFloat(results.result_data.average_mark).toFixed(2)}%
              </h2>
              <div className='flex gap-3'>
                <p className="text-sm mt-1">
                  Total: <span className='font-black text-white'>{results.result_data.total_marks}</span> 
                </p>
                <p className="text-sm mt-1">
                  Position: <span className='font-black text-white'>{results.result_data.rank}</span>
                </p>
              </div>
            </div>
            <div className="bg-white/20 p-3 rounded-full">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
          </div>
        ) : (
          <div className="text-center py-4">
            <p>No results available</p>
          </div>
        )}
      </div>

      {/* Results List */}
      <div className="mx-6 mt-6 space-y-3">
        <h3 className="font-medium text-gray-700 flex items-center">
          <svg className="w-4 h-4 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
          Subject Results
        </h3>
        
        {loading ? (
          <>
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white p-4 rounded-xl shadow-sm">
                <div className="flex justify-between items-center">
                  <div>
                    <Skeleton width={120} height={20} />
                    <Skeleton width={180} height={16} className="mt-1" />
                  </div>
                  <div className="text-right">
                    <Skeleton width={40} height={24} className="inline-block" />
                    <Skeleton width={50} height={24} className="mt-1 block" />
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : error ? (
          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <svg className="w-10 h-10 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <p className="mt-3 text-gray-500">Error loading results</p>
          </div>
        ) : results?.result_data.subjects_results && results.result_data.subjects_results.length > 0 ? (
          results.result_data.subjects_results.map((result, index) => (
            <div key={index} className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition duration-200">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium text-gray-800">{result.subject_name}</h4>
                  <p className="text-xs text-gray-500 mt-1">Class: {result.class_display}</p>
                </div>
                <div className="text-right">
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                    result.result >= 90 ? 'bg-green-100 text-green-800' :
                    result.result >= 80 ? 'bg-blue-100 text-blue-800' :
                    result.result >= 70 ? 'bg-indigo-100 text-indigo-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {result.result >= 90 ? 'A' :
                     result.result >= 80 ? 'B' :
                     result.result >= 70 ? 'C' : 'D'}
                  </span>
                  <p className="text-lg font-bold mt-1">{result.result}%</p>
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
      {!loading && results?.result_data.subjects_results && results.result_data.subjects_results.length > 0 && (
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