import React, { useState, useEffect } from 'react';
import { useAuth, useData } from '../context/context';
import type { AppData, Term } from '../types';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface TopPerformer {
  student_id: string;
  full_name: string;
  class_id: string;
  class_name: string;
  average_score: number;
  rank: number;
  portrait: string;
}

const Stats = () => {
  const token = useAuth();
  const [selectedTerm, setSelectedTerm] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<string>('');
  const [topPerformers, setTopPerformers] = useState<Record<string, TopPerformer[]>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const data = useData() as { data?: AppData };

  // Get available years (last 3 years + current year)
  const getAvailableYears = () => {
    const currentYear = new Date().getFullYear();
    return [
      currentYear.toString(),
      (currentYear - 1).toString(),
      (currentYear - 2).toString()
    ];
  };

  useEffect(() => {
    if (data.data?.terms.length && !selectedTerm) {
      setSelectedTerm(data.data.terms[0].term_id);
    }
    if (!selectedYear) {
      setSelectedYear(new Date().getFullYear().toString());
    }
  }, [data.data, selectedTerm, selectedYear]);

  useEffect(() => {
    const fetchTopPerformers = async () => {
      if (!selectedTerm || !selectedYear) return;
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `http://localhost:3000/api/stats/top-performers?year=${selectedYear}&term=${selectedTerm}`,
          {
            headers: {
              Authorization: `Bearer ${token?.token}`
            }
          }
        );
        if (!response.ok) {
          throw new Error('Failed to fetch top performers');
        }
        const result = await response.json();
        setTopPerformers(result.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error occurred');
      } finally {
        setLoading(false);
      }
    };
    fetchTopPerformers();
  }, [selectedTerm, selectedYear, token]);

  const getMedalColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-b from-yellow-400 to-yellow-300';
      case 2:
        return 'bg-gradient-to-b from-gray-300 to-gray-200';
      case 3:
        return 'bg-gradient-to-b from-amber-600 to-amber-500';
      default:
        return 'bg-indigo-900';
    }
  };

  const getMedalIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return '🥇';
      case 2:
        return '🥈';
      case 3:
        return '🥉';
      default:
        return rank;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 pb-20">
      <div className="pt-6 px-6">
        <h1 className="text-2xl font-bold text-white mb-2 flex items-center">
          <svg className="w-6 h-6 mr-2 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Top Performers
        </h1>
        <p className="text-indigo-400 text-sm">Academic excellence leaders by class</p>
      </div>

      {/* Under Development Banner */}
      <div className="relative mx-6 mt-8 p-8 bg-gradient-to-r from-purple-700 to-indigo-900 rounded-3xl shadow-2xl text-center overflow-hidden">
        <div className="absolute top-4 right-4 text-white text-4xl opacity-10 animate-bounce">🚀</div>
        <div className="z-10 relative">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-800 rounded-full shadow-lg mb-4 mx-auto">
            <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m0-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-3xl font-extrabold text-white mb-2">Coming Soon</h3>
          <p className="text-indigo-200 text-sm sm:text-base">We're working hard to bring this feature to life. Stay tuned!</p>
          <span className="inline-block mt-4 px-4 py-2 text-xs font-semibold bg-indigo-500/20 rounded-full text-white tracking-wide uppercase">
            Under Development
          </span>
        </div>
      </div>

      {/* Filter Dropdowns (Commented Out – Update Styles If Needed) */}
      {/* 
      <div className="bg-gray-800 mx-6 mt-6 p-4 rounded-xl shadow-sm">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-gray-400 font-medium mb-1">Academic Year</label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full p-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-indigo-500"
              disabled={loading}
            >
              {getAvailableYears().map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs text-gray-400 font-medium mb-1">Term</label>
            <select
              value={selectedTerm}
              onChange={(e) => setSelectedTerm(e.target.value)}
              className="w-full p-2 border border-gray-600 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-indigo-500"
              disabled={loading}
            >
              {data.data?.terms.map((term: Term) => (
                <option key={term.term_id} value={term.term_id}>
                  Term {term.index}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      */}

      {/* Loading Skeleton Placeholder */}
      {/* 
      {loading && (
        <div className="mx-6 mt-6 space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-gray-800 p-4 rounded-xl shadow-sm">
              <Skeleton baseColor="#2d3748" highlightColor="#4a5568" height={20} width={120} className="mb-3" />
              <div className="space-y-3">
                {[...Array(3)].map((_, j) => (
                  <div key={j} className="flex items-center">
                    <Skeleton circle width={40} height={40} />
                    <div className="ml-3 flex-1">
                      <Skeleton baseColor="#2d3748" highlightColor="#4a5568" width={150} height={16} />
                      <Skeleton baseColor="#2d3748" highlightColor="#4a5568" width={100} height={14} className="mt-1" />
                    </div>
                    <Skeleton baseColor="#2d3748" highlightColor="#4a5568" width={40} height={20} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
      */}

      {/* Render Top Performers */}
      {/* 
      {!loading && Object.keys(topPerformers).length > 0 && (
        <div className="mx-6 mt-6 space-y-6">
          {Object.entries(topPerformers).map(([className, performers]) => (
            <div key={className} className="bg-gray-800 rounded-xl shadow-sm overflow-hidden">
              <div className="bg-indigo-900/30 px-4 py-3 border-b border-gray-700">
                <h3 className="font-medium text-indigo-300">Grade {className}</h3>
              </div>
              <div className="divide-y divide-gray-700">
                {performers.map((student) => (
                  <div key={student.student_id} className="p-4 hover:bg-gray-700 transition-colors">
                    <div className="flex items-center">
                      <div className="relative">
                        <img
                          src={student.portrait}
                          alt={student.full_name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-gray-600 shadow-sm"
                        />
                        <div
                          className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${getMedalColor(student.rank)}`}
                        >
                          {getMedalIcon(student.rank)}
                        </div>
                      </div>
                      <div className="ml-4 flex-1">
                        <h4 className="font-medium text-white">{student.full_name}</h4>
                        <p className="text-xs text-gray-400">ID: {student.student_id}</p>
                      </div>
                      <div className="text-right">
                        <div
                          className={`text-lg font-bold ${
                            student.average_score >= 90
                              ? 'text-yellow-400'
                              : student.average_score >= 80
                                ? 'text-indigo-400'
                                : 'text-gray-300'
                          }`}
                        >
                          {student.average_score.toFixed(1)}%
                        </div>
                        <div className="text-xs text-gray-400 mt-1">
                          {student.rank === 1 ? 'Top Performer' : `Rank #${student.rank}`}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
      */}

      {/* No Data State */}
      {/* 
      {!loading && Object.keys(topPerformers).length === 0 && !error && (
        <div className="mx-6 mt-6 bg-gray-800 p-6 rounded-xl shadow-sm text-center">
          <svg className="w-10 h-10 mx-auto text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="mt-3 text-gray-400">No top performers data available</p>
          <p className="text-sm text-gray-500 mt-1">Please select a different year or term</p>
        </div>
      )}
      */}

      {/* Error Message */}
      {/* 
      {error && (
        <div className="mx-6 mt-4 bg-red-900/30 border border-red-800 text-red-300 px-4 py-3 rounded">
          {error}
        </div>
      )}
      */}
    </div>
  );
};

export default Stats;