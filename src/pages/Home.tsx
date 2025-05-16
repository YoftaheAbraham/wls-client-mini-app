import React from 'react';
import { useData } from '../context/context';
import { Link } from 'react-router-dom';

const Home = () => {
    const data = useData();

    if (!data?.data.student_info) return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-indigo-50 to-white">
            <div className="text-center p-6">
                <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-500 rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-indigo-600 font-medium">Loading your dashboard...</p>
            </div>
        </div>
    );

    const { full_name, grade, class_id, portrait, std_id, email } = data.data.student_info;
    const firstName = full_name.split(' ')[0];

    return (
        <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white pb-24">
            {/* Welcome Header */}
            <div className="pt-8 px-6 text-center">
                <h1 className="text-2xl font-bold text-gray-800 mb-1">Welcome back, {firstName}!</h1>
                <p className="text-indigo-400">Your academic journey at a glance</p>
            </div>

            {/* Profile Picture */}
            <div className="flex justify-center my-6">
                <div className="relative">
                    <img
                        src={portrait}
                        className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-xl"
                        alt="Student portrait"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-indigo-500 text-white rounded-full px-2 py-1 text-xs font-bold shadow">
                        Grade {grade}
                    </div>
                </div>
            </div>

            {/* Student Info Card */}
            <div className="mx-6 mb-8 bg-white rounded-2xl shadow-sm p-5">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Full Name</p>
                        <p className="font-medium text-gray-700">{full_name}</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Class</p>
                        <p className="font-medium text-gray-700">{class_id}</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Student ID</p>
                        <p className="font-medium text-gray-700">{std_id}</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">Email</p>
                        <p className="font-medium text-gray-700 truncate">{email}</p>
                    </div>
                </div>
            </div>

            {/* Results Section */}
            f

            {/* Quick Actions */}
            <div className="mx-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Quick Actions
                </h2>
                <div className="grid grid-cols-2 gap-4">
                    <button className="bg-white hover:bg-indigo-50 rounded-xl shadow-sm p-4 flex flex-col items-center transition duration-200">
                        <Link to={'/result-hub'}>
                            <div className="bg-indigo-100 p-3 rounded-full mb-2">
                                <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            </div>
                            <span className="font-medium text-gray-700">Results Hub</span>
                        </Link>
                    </button>

                    <button className="bg-white hover:bg-indigo-50 rounded-xl shadow-sm p-4 flex flex-col items-center transition duration-200">
                        <div className="bg-indigo-100 p-3 rounded-full mb-2">
                            <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>
                        <span className="font-medium text-gray-700">Settings</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Home;