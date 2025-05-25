import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useAuth, useData } from './../context/context';

const Login = () => {
  const [credentials, setCredentials] = useState({
    identity: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const tokenCtx = useAuth();
  const dataCtx = useData();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const loadingToast = toast.loading('Signing in...', {
      style: {
        background: '#1E2C3A',
        color: '#E1E9F1',
        borderRadius: '12px'
      }
    });

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/student/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });

      if (res.status === 401) {
        toast.error('Invalid credentials!', { id: loadingToast });
        return;
      }
      if (!res.ok) {
        toast.error('Network error while fetching!', { id: loadingToast });
        return;
      }

      const json = await res.json();

      if (json.success) {
        tokenCtx?.setToken(json.data.token, true);
        dataCtx?.setData(json.data.data, true);

        toast.success('Successfully signed in!', { id: loadingToast });
        setTimeout(() => navigate('/'), 400);
      }
    } catch (err) {
      toast.error('Unable to sign in!', { id: loadingToast });
    } finally {
      setIsLoading(false);
    }
  };

  const SchoolLogo = () => (
    <img 
      className="w-20 h-20 my-2 rounded-full border-2 border-[#2B3B4D]"
      src="https://wolaita-liqa-school.netlify.app/static/logo-B3HMawlj.jpg"
      alt="School Logo"
    />
  );

  return (
    <div className="flex items-center justify-center bg-[#17212B] p-4">
      <Toaster position="top-center" />

      <div className="w-full max-w-md bg-[#1E2C3A] rounded-2xl border border-[#2B3B4D] shadow-xl p-8">
        <div className="text-center mb-6 flex flex-col items-center">
          <SchoolLogo />
          <h1 className="text-2xl font-bold text-[#E1E9F1]">Wolaita Liqa School</h1>
          <p className="text-[#54A7E5] mt-1">Student Portal</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label htmlFor="identity" className="block text-sm font-medium text-[#A4B8D1]">
              Student ID or Email
            </label>
            <input
              id="identity"
              name="identity"
              type="text"
              value={credentials.identity}
              onChange={handleChange}
              placeholder="e.g. ABCD-1234 or student@mail.com"
              required
              className="w-full px-4 py-3 rounded-xl bg-[#222E3A] border border-[#2B3B4D] text-[#E1E9F1] focus:ring-2 focus:ring-[#54A7E5] focus:border-transparent"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-[#A4B8D1]">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              className="w-full px-4 py-3 rounded-xl bg-[#222E3A] border border-[#2B3B4D] text-[#E1E9F1] focus:ring-2 focus:ring-[#54A7E5] focus:border-transparent"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 bg-[#54A7E5] hover:bg-[#3D8FD4] text-white py-3 px-4 rounded-xl font-medium shadow-md transition-all"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing in...
              </>
            ) : 'Sign In'}
          </button>

          <div className="text-center pt-2">
            <a href="#" className="text-sm text-[#54A7E5] hover:underline transition">
              Forgot password?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;