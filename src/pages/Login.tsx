import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuth, useData } from '../context/context';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [credentials, setCredentials] = useState({
    identity: '',
    password: ''
  });
    const token = useAuth();
    const contextData = useData()
    const navigator = useNavigate();
    const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
        const response = await fetch('http://localhost:3000/api/student/login', {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(credentials)
        })
        if(response.status == 401) return toast.error("Invalid credentials!")
        if(!response.ok) return toast.error("NetworkeError while fetching!")
        const data = await response.json();
      console.log(data.data.data);
      
        if(data.success) {
            toast.success("Successfully signed in");
            token?.setToken(data.data.token, true)
            contextData?.setData(data.data.data, true)

            setTimeout(() => {
              navigator('/')
            }, 500)
        }
    } catch (error) {
        toast.error("Unable to sign in!")
    }
    
    // Authentication logic will go here
  };

  // School logo (using an SVG placeholder - replace with your actual logo)
  const SchoolLogo = () => (
    <svg className="w-16 h-16 mx-auto mb-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L1 7L5 9.18V14.82L1 17L12 22L23 17L19 14.82V9.18L23 7L12 2Z" fill="#3B82F6"/>
      <path d="M5 9.18V14.82L12 18.82L19 14.82V9.18L12 5.18L5 9.18Z" fill="#93C5FD"/>
      <path d="M12 12L9 10.5V13.5L12 15L15 13.5V10.5L12 12Z" fill="#FFFFFF"/>
    </svg>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <div className="text-center mb-6">
          <SchoolLogo />
          <h1 className="text-3xl font-bold text-gray-800">Wolaita Liqa School</h1>
          <p className="text-blue-600 mt-1">Student Portal</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1">
            <label htmlFor="studentIdOrEmail" className="block text-sm font-medium text-gray-600">
              Student ID or Email
            </label>
            <input
              type="text"
              id="studentIdOrEmail"
              name="identity"
              value={credentials.identity}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="e.g. ABCD-1234 or student@gmail.com"
              required
            />
          </div>
          
          <div className="space-y-1">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-3 px-4 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-300"
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>

          <div className="text-center pt-2">
            <a href="#" className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition">
              Forgot password?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;