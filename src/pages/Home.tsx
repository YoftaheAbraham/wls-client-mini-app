import React, { useEffect } from 'react';
import { useData } from '../context/context';
import { Link } from 'react-router-dom';

const envData = import.meta.env

const Home = () => {
    const data = useData();

    useEffect(() => {
        console.log(data);
        console.log(envData);
        
    })

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
        </div>
    );
};

export default Home;