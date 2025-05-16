import { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/context';
import Login from './pages/Login';
import Home from './pages/Home';
import ResultHub from './pages/ResultHub';


function App() {
  const token = useAuth();

  return (
    <Routes>
      <Route 
        path='/' 
        element={token?.token ? <Home /> : <Navigate to={'/login'}/>}
      />
      <Route 
        path='/result-hub' 
        element={token?.token ? <ResultHub /> : <Navigate to={'/login'}/>}
      />
      <Route 
        path='/login' 
        element={<Login />}
      />
    </Routes>
  );
}

export default App;
// function App() {
//   // Mock data - replace with your API data
//   const [studentData] = useState({
//     name: "Alex Johnson",
//     class: "Grade 12-A",
//     studentId: "STU-2023-045",
//     overallAverage: 86,
//     performanceTrend: +5.2, // percentage increase/decrease
//   });

//   // Academic years and terms data
//   const academicYears = ['2023-2024', '2022-2023', '2021-2022'];
//   const terms = ['Term 1', 'Term 2', 'Term 3'];
  
//   // State for selections
//   const [selectedYear, setSelectedYear] = useState(academicYears[0]);
//   const [selectedTerm, setSelectedTerm] = useState(terms[0]);

//   // Mock term results data
//   const termResults = {
//     subjects: [
//       { name: "Mathematics", score: 92, grade: "A", trend: +3.5 },
//       { name: "Physics", score: 88, grade: "A-", trend: -1.2 },
//       { name: "Chemistry", score: 85, grade: "B+", trend: +2.1 },
//       { name: "Literature", score: 78, grade: "B+", trend: +0.5 },
//       { name: "History", score: 82, grade: "A-", trend: +4.3 },
//     ],
//     averageTrend: +5.2,
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 p-4 text-gray-800">
//       {/* Header */}
//       <header className="mb-6">
//         <h1 className="text-2xl font-bold text-indigo-700">Academic Dashboard</h1>
//         <div className="mt-2 flex items-center space-x-3">
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 rounded-full bg-indigo-100 p-2 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//           </svg>
//           <div>
//             <p className="font-medium">{studentData.name}</p>
//             <p className="text-sm text-gray-500">{studentData.class} • {studentData.studentId}</p>
//           </div>
//         </div>
//       </header>

//       {/* Academic Year and Term Selectors */}
//       <div className="mb-6 grid grid-cols-2 gap-3">
//         <div>
//           <label className="mb-1 block text-sm font-medium text-gray-700">Academic Year</label>
//           <select 
//             value={selectedYear}
//             onChange={(e) => setSelectedYear(e.target.value)}
//             className="w-full rounded-lg border border-gray-300 bg-white p-2 text-sm shadow-sm"
//           >
//             {academicYears.map(year => (
//               <option key={year} value={year}>{year}</option>
//             ))}
//           </select>
//         </div>
//         <div>
//           <label className="mb-1 block text-sm font-medium text-gray-700">Term</label>
//           <select 
//             value={selectedTerm}
//             onChange={(e) => setSelectedTerm(e.target.value)}
//             className="w-full rounded-lg border border-gray-300 bg-white p-2 text-sm shadow-sm"
//           >
//             {terms.map(term => (
//               <option key={term} value={term}>{term}</option>
//             ))}
//           </select>
//         </div>
//       </div>

//       {/* Performance Overview Card */}
//       <div className="mb-6 rounded-xl bg-white p-4 shadow-lg">
//         <h2 className="mb-3 text-lg font-semibold">Performance Overview</h2>
        
//         <div className="flex items-center justify-between">
//           <div className="flex items-end space-x-2">
//             <p className="text-4xl font-bold text-indigo-600">{studentData.overallAverage}%</p>
//             <p className="text-sm text-gray-500">Overall</p>
//           </div>
          
//           <div className={`flex items-center rounded-full px-3 py-1 ${
//             studentData.performanceTrend >= 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
//           }`}>
//             <svg 
//               xmlns="http://www.w3.org/2000/svg" 
//               className={`h-4 w-4 ${studentData.performanceTrend >= 0 ? 'text-green-600' : 'text-red-600'}`} 
//               fill="none" 
//               viewBox="0 0 24 24" 
//               stroke="currentColor"
//             >
//               <path 
//                 strokeLinecap="round" 
//                 strokeLinejoin="round" 
//                 strokeWidth={2} 
//                 d={studentData.performanceTrend >= 0 ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} 
//               />
//             </svg>
//             <span className="ml-1 text-sm font-medium">
//               {Math.abs(studentData.performanceTrend)}%
//             </span>
//           </div>
//         </div>

//         {/* Mini Bar Chart - Replace with actual chart library if needed */}
//         <div className="mt-4 flex h-20 items-end space-x-1">
//           {[60, 75, 82, 78, 86].map((value, index) => (
//             <div 
//               key={index}
//               className={`flex-1 rounded-t-sm ${
//                 index === 4 ? 'bg-indigo-500' : 'bg-gray-200'
//               }`}
//               style={{ height: `${value * 0.8}%` }}
//               title={`Term ${index + 1}: ${value}%`}
//             ></div>
//           ))}
//         </div>
//         <p className="mt-1 text-center text-xs text-gray-500">Performance trend over last 5 terms</p>
//       </div>

//       {/* Subject-wise Performance */}
//       <section className="mb-6">
//         <h2 className="mb-3 text-lg font-semibold">Subject Results</h2>
        
//         <div className="space-y-3">
//           {termResults.subjects.map((subject, index) => (
//             <div key={index} className="rounded-lg border bg-white p-4 shadow-sm">
//               <div className="flex items-start justify-between">
//                 <div className="flex-1">
//                   <h3 className="font-medium">{subject.name}</h3>
//                   <div className="mt-1 flex items-center space-x-3">
//                     <span className="text-xl font-bold text-indigo-600">{subject.score}%</span>
//                     <span className={`text-sm font-medium rounded-full px-2 py-0.5 ${
//                       subject.grade.startsWith('A') ? 'bg-green-100 text-green-800' : 
//                       subject.grade.startsWith('B') ? 'bg-blue-100 text-blue-800' : 
//                       'bg-yellow-100 text-yellow-800'
//                     }`}>
//                       {subject.grade}
//                     </span>
//                   </div>
//                 </div>
                
//                 <div className={`flex items-center ${
//                   subject.trend >= 0 ? 'text-green-600' : 'text-red-600'
//                 }`}>
//                   <svg 
//                     xmlns="http://www.w3.org/2000/svg" 
//                     className="h-5 w-5" 
//                     fill="none" 
//                     viewBox="0 0 24 24" 
//                     stroke="currentColor"
//                   >
//                     <path 
//                       strokeLinecap="round" 
//                       strokeLinejoin="round" 
//                       strokeWidth={2} 
//                       d={subject.trend >= 0 ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} 
//                     />
//                   </svg>
//                   <span className="ml-1 text-sm font-medium">
//                     {Math.abs(subject.trend)}%
//                   </span>
//                 </div>
//               </div>
              
//               <div className="mt-3 flex items-center text-xs text-gray-500">
//                 <span className="w-20">Last term: {subject.score - subject.trend}%</span>
//                 <div className="flex-1 h-2 rounded-full bg-gray-200 mx-2">
//                   <div 
//                     className={`h-2 rounded-full ${
//                       subject.score >= 90 ? 'bg-green-500' :
//                       subject.score >= 80 ? 'bg-blue-500' :
//                       'bg-yellow-500'
//                     }`} 
//                     style={{ width: `${subject.score}%` }}
//                   ></div>
//                 </div>
//                 <span>Current</span>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>
//       <div className="grid grid-cols-3 gap-3">
//         <button className="flex flex-col items-center rounded-lg border bg-white p-3 shadow-sm">
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//           </svg>
//           <span className="mt-1 text-xs">Report</span>
//         </button>
//         <button className="flex flex-col items-center rounded-lg border bg-white p-3 shadow-sm">
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
//           </svg>
//           <span className="mt-1 text-xs">Statistics</span>
//         </button>
//         <button className="flex flex-col items-center rounded-lg border bg-white p-3 shadow-sm">
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
//           </svg>
//           <span className="mt-1 text-xs">Feedback</span>
//         </button>
//       </div>
//     </div>
//   );
// }

// export default App;