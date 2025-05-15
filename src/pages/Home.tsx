import React from 'react';
import { useData } from '../context/context';

const Home = () => {
    const data = useData();

    if (!data?.data.student_info) return <div className="p-4 text-center">Loading...</div>;

    const { full_name, grade, class_id, portrait } = data.data.student_info;

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4">
            {/* Profile Header */}
            <div className="flex items-center space-x-4 mb-8">
                <img 
                    src={portrait} 
                    className="w-16 h-16 rounded-full object-cover border-4 border-white shadow"
                />
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Hi, {full_name.split(' ')[0]}!</h1>
                    <p className="text-blue-600">Grade {grade} • Class {class_id}</p>
                </div>
            </div>

            {/* Key Info */}
            <div className="space-y-4 mb-8">
                <div className="bg-white/80 backdrop-blur-sm p-5 rounded-2xl shadow-sm">
                    <h2 className="font-semibold text-gray-500 mb-1">Student ID</h2>
                    <p className="text-lg font-medium">{data.data.student_info.std_id}</p>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="fixed bottom-6 left-4 right-4">
                <div className="bg-white p-3 rounded-full shadow-lg flex justify-center gap-4">
                    <button className="p-3 text-blue-500">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                    </button>
                    <button className="p-3 text-blue-500">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Home;