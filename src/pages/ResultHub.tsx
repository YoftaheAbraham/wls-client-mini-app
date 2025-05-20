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

interface TermData {
  term_id: string;
  term_index: number;
  term_total: number;
  term_average: number;
  subject_count: number;
}

interface ResultsData {
  student_info: {
    std_id: string;
    full_name: string;
    grade: number;
    portrait: string;
  };
  result_data: {
    subjects_count?: string;
    total_marks?: string;
    average_mark?: string;
    rank?: string | null;
    subjects_results?: SubjectResult[];
    std_id?: string;
    first_name?: string;
    last_name?: string;
    overall_total?: string;
    overall_avg?: string;
    terms_data?: TermData[];
  };
}

const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL

const ResultHub = () => {
  const token = useAuth();
  const [selectedTerm, setSelectedTerm] = useState<string>('');
  const [selectedClass, setSelectedClass] = useState<string>('');
  const [results, setResults] = useState<ResultsData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const data = useData() as { data?: AppData };

  const isEmptyResults = (results: ResultsData | null) => {
    if (!results) return true;

    if (selectedTerm === 'overall') {
      return !results.result_data.overall_avg || !results.result_data.terms_data?.length;
    } else {
      return (
        results.result_data.subjects_count === "0" &&
        results.result_data.total_marks === "0" &&
        results.result_data.average_mark === "0" &&
        (!results.result_data.subjects_results || results.result_data.subjects_results.length === 0)
      );
    }
  };

  const transformClassToGrade = (classData: any): Classroom => {
    return {
      class_id: classData.class_id,
      grade: classData.class || classData.grade,
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
      // Don't fetch if there are no attended classes
      if (!selectedClass || !data.data?.attendedClasses?.length) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        let url;
        if (selectedTerm === 'overall') {
          url = `${BACKEND_BASE_URL}/api/student/data/${selectedClass}/overall`;
        } else if (selectedTerm) {
          url = `${BACKEND_BASE_URL}/api/student/data/${selectedClass}/${selectedTerm}`;
        } else {
          return;
        }

        const response = await fetch(url, {
          headers: {
            'Authorization': `Bearer ${token?.token}`
          }
        });

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
  }, [selectedTerm, selectedClass, token, data.data?.attendedClasses]);

  const getPerformanceColor = (percentage: number) => {
    if (percentage < 75) {
      return {
        bg: 'bg-red-50',
        text: 'text-red-800',
        border: 'border-red-200',
        icon: '⚠️',
        message: 'Needs improvement'
      };
    } else if (percentage >= 75 && percentage < 80) {
      return {
        bg: 'bg-yellow-50',
        text: 'text-yellow-800',
        border: 'border-yellow-200',
        icon: '👍',
        message: 'Needs improvement'
      };
    } else if (percentage >= 80 && percentage < 90) {
      return {
        bg: 'bg-blue-50',
        text: 'text-blue-800',
        border: 'border-blue-200',
        icon: '👏',
        message: 'Well done'
      };
    } else if (percentage >= 90 && percentage < 95) {
      return {
        bg: 'bg-green-50',
        text: 'text-green-800',
        border: 'border-green-200',
        icon: '🌟',
        message: 'Very good'
      };
    } else {
      return {
        bg: 'bg-gradient-to-r from-yellow-100 to-yellow-50',
        text: 'text-yellow-800',
        border: 'border-yellow-300',
        icon: '👑',
        message: 'Outstanding!'
      };
    }
  };

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

  // Check if there are no attended classes
  if (!attendedClasses || attendedClasses.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white pb-20">
        {/* Header */}
        <div className="pt-6 px-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2 flex items-center">
            <svg className="w-6 h-6 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Results
          </h1>
          <p className="text-indigo-400 text-sm">Track your academic performance</p>
        </div>

        {/* Student Info */}
        <div className="mx-6 mt-6 bg-white p-4 rounded-xl shadow-sm flex items-center">
          <img
            src={student_info.portrait}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div className="ml-4">
            <h2 className="font-bold text-gray-800">
              {student_info.full_name}
            </h2>
            <p className="text-sm text-gray-600">
              ID: {student_info.std_id}
            </p>
            <p className="text-sm text-gray-600">
              Grade: {student_info.grade}
            </p>
          </div>
        </div>

        {/* Empty State */}
        <div className="mx-6 mt-6 bg-white p-8 rounded-xl shadow-sm text-center">
          <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-900">No class records found</h3>
          <p className="mt-2 text-gray-500">
            You don't have any attended classes recorded yet.
          </p>
          <p className="text-sm text-gray-400 mt-1">
            Please contact your school administrator if this is incorrect.
          </p>
        </div>
      </div>
    );
  }

  let allClasses = [
    transformClassToGrade(student_info.current_class),
    ...attendedClasses
      .filter((c: Classroom) => c.class_id !== student_info.current_class.class_id)
      .map(transformClassToGrade)
  ];

  const isOverall = selectedTerm === 'overall';
  const averageMark = isOverall ?
    parseFloat(results?.result_data.overall_avg || '0') :
    parseFloat(results?.result_data.average_mark || '0');
  const totalMarks = isOverall ?
    results?.result_data.overall_total :
    results?.result_data.total_marks;

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white pb-20">
      {/* Header */}
      <div className="pt-6 px-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2 flex items-center">
          <svg className="w-6 h-6 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          Results
        </h1>
        <p className="text-indigo-400 text-sm">Track your academic performance</p>
      </div>

      {/* Student Info */}
      <div className="mx-6 mt-6 bg-white p-4 rounded-xl shadow-sm flex items-center">
        <img
          src={student_info.portrait}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div className="ml-4">
          <h2 className="font-bold text-gray-800">
            {student_info.full_name}
          </h2>
          <p className="text-sm text-gray-600">
            ID: {student_info.std_id}
          </p>
          <p className="text-sm text-gray-600">
            Grade: {student_info.grade}
          </p>
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
              <option value="overall">Overall</option>
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
      {!isEmptyResults(results) && (
        <div className={`mx-6 mt-6 p-5 rounded-xl shadow-md ${averageMark < 75 ? 'bg-red-100 border border-red-200 text-red-800' :
            averageMark >= 95 ? 'bg-gradient-to-r from-yellow-300 to-yellow-200 text-yellow-900' :
              'bg-gradient-to-r from-indigo-500 to-indigo-600 text-white'
          }`}>
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
                <p className="text-sm opacity-80">
                  {isOverall ? 'Overall Performance (All Terms)' : 'Overall Performance'}
                </p>
                <div className="flex items-center">
                  <h2 className="text-2xl font-bold mt-1">
                    {averageMark.toFixed(2)}%
                  </h2>
                  {averageMark >= 95 && (
                    <span className="ml-2 text-2xl">👑</span>
                  )}
                  {averageMark < 75 && (
                    <span className="ml-2 text-xl">⚠️</span>
                  )}
                </div>
                <div className='flex gap-3'>
                  <p className="text-sm mt-1">
                    Total: <span className='font-black'>{
                      averageMark < 75 ?
                        <span className="text-red-900">{totalMarks}</span> :
                        averageMark >= 95 ?
                          <span className="text-yellow-900">{totalMarks}</span> :
                          <span className="text-white">{totalMarks}</span>
                    }</span>
                  </p>
                  {results.result_data.rank && (
                    <p className="text-sm mt-1">
                      Rank: <span className='font-black'>{
                        averageMark < 75 ?
                          <span className="text-red-900">{results.result_data.rank}</span> :
                          averageMark >= 95 ?
                            <span className="text-yellow-900">{results.result_data.rank}</span> :
                            <span className="text-white">{results.result_data.rank}</span>
                      }</span>
                    </p>
                  )}
                </div>
                {averageMark < 75 && (
                  <p className="text-xs mt-2 font-medium">⚠️ Warning: Your average is below passing grade</p>
                )}
              </div>
              <div className={`p-3 rounded-full ${averageMark < 75 ? 'bg-red-200/30' :
                  averageMark >= 95 ? 'bg-yellow-300/30' :
                    'bg-white/20'
                }`}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
            </div>
          ) : null}
        </div>
      )}

      {/* Term-wise Performance (Only for Overall view) */}
      {isOverall && results?.result_data.terms_data && !isEmptyResults(results) && (
        <div className="mx-6 mt-6">
          <h3 className="font-medium text-gray-700 flex items-center mb-3">
            <svg className="w-4 h-4 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            Term-wise Performance
          </h3>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Term
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Subjects
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total Marks
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Average
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {results.result_data.terms_data.map((term, index) => {
                  const performance = getPerformanceColor(term.term_average);
                  return (
                    <tr key={index} className={`${performance.bg} hover:${performance.bg.replace('50', '100')}`}>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                        Term {term.term_index}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        {term.subject_count}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        {term.term_total}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                        <span className={`${performance.text}`}>
                          {term.term_average}%
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Subject Results (Only for term view) */}
      {!isOverall && (
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
          ) : isEmptyResults(results) ? (
            <div className="bg-white p-6 rounded-xl shadow-sm text-center">
              <svg className="w-10 h-10 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="mt-3 text-gray-500">No results available for this term yet</p>
              <p className="text-sm text-gray-400 mt-1">Please check back later or contact your teacher</p>
            </div>
          ) : results?.result_data.subjects_results && results.result_data.subjects_results.length > 0 ? (
            results.result_data.subjects_results.map((result, index) => {
              const performance = getPerformanceColor(result.result);
              return (
                <div
                  key={index}
                  className={`p-4 rounded-xl shadow-sm hover:shadow-md transition duration-200 border ${performance.bg} ${performance.border}`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className={`font-medium ${performance.text}`}>{result.subject_name}</h4>
                      <p className="text-xs text-gray-500 mt-1">Class: {result.class_display}</p>
                      {result.result < 75 && (
                        <div className="mt-1 flex items-center">
                          <span className="text-xs font-medium text-red-600">⚠️ Below passing grade</span>
                        </div>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="flex items-center justify-end">
                        <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${result.result >= 95 ? 'bg-yellow-100 text-yellow-800' :
                            result.result >= 90 ? 'bg-green-100 text-green-800' :
                              result.result >= 80 ? 'bg-blue-100 text-blue-800' :
                                result.result >= 75 ? 'bg-indigo-100 text-indigo-800' :
                                  'bg-red-100 text-red-800'
                          }`}>
                          {result.result >= 95 ? 'A+' :
                            result.result >= 90 ? 'A' :
                              result.result >= 80 ? 'B' :
                                result.result >= 75 ? 'C' : 'F'}
                        </span>
                        {result.result >= 95 && (
                          <span className="ml-1 text-xl">👑</span>
                        )}
                      </div>
                      <div className="mt-1 flex items-center justify-end">
                        <p className={`text-lg font-bold ${performance.text}`}>{result.result}%</p>
                      </div>
                      <p className={`text-xs mt-1 ${performance.text}`}>{performance.message}</p>
                    </div>
                  </div>
                </div>
              );
            })
          ) : null}
        </div>
      )}
    </div>
  );
};

export default ResultHub;