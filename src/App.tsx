import { Routes, Route, Navigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from './context/context';
import Login from './pages/Login';
import Home from './pages/Home';
import ResultHub from './pages/ResultHub';
import Setting from './pages/Stats';
import { useState } from 'react';

// SVG Components with updated colors for dark theme
const HomeIcon = ({ active }: { active: boolean }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
      stroke={active ? "#54A7E5" : "#A4B8D1"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9 22V12H15V22"
      stroke={active ? "#54A7E5" : "#A4B8D1"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ResultIcon = ({ active }: { active: boolean }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M8 7V3M16 7V3M7 11H17M5 21H19C20.1046 21 21 20.1046 21 19V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V19C3 20.1046 3.89543 21 5 21Z"
      stroke={active ? "#54A7E5" : "#A4B8D1"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const StatsIcon = ({ active }: { active: boolean }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M4 20V10"
      stroke={active ? "#54A7E5" : "#A4B8D1"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10 20V4"
      stroke={active ? "#54A7E5" : "#A4B8D1"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16 20V14"
      stroke={active ? "#54A7E5" : "#A4B8D1"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M22 20H2"
      stroke={active ? "#54A7E5" : "#A4B8D1"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const LogoutIcon = ({ active }: { active: boolean }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9"
      stroke={active ? "#54A7E5" : "#A4B8D1"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16 17L21 12L16 7"
      stroke={active ? "#54A7E5" : "#A4B8D1"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M21 12H9"
      stroke={active ? "#54A7E5" : "#A4B8D1"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const LoginIcon = ({ active }: { active: boolean }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M15 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H15"
      stroke={active ? "#54A7E5" : "#A4B8D1"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10 17L15 12L10 7"
      stroke={active ? "#54A7E5" : "#A4B8D1"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15 12H3"
      stroke={active ? "#54A7E5" : "#A4B8D1"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

function App() {
  const token = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    token?.logout();
    setShowLogoutModal(false);
  };

  const cancelLogout = () => {
    setShowLogoutModal(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#17212B]">
      {showLogoutModal && (
        <div style={{background: "rgba(0,0,0,0.75)"}} className="fixed inset-0 bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-[#1E2C3A] p-6 rounded-xl max-w-sm w-full mx-4 border border-[#2B3B4D]">
            <h3 className="text-lg font-medium text-[#E1E9F1] mb-4">Logout Confirmation</h3>
            <p className="text-[#A4B8D1] mb-6">Are you sure you want to logout?</p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={cancelLogout}
                className="px-4 py-2 border border-[#2B3B4D] rounded-md text-[#E1E9F1] hover:bg-[#2B3B4D] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="px-4 py-2 bg-[#54A7E5] text-white rounded-md hover:bg-[#3D8FD4] transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="flex-1 pb-16">
        <Routes>
          <Route path="/" element={token?.token ? <Home /> : <Navigate to="/login" />} />
          <Route path="/result-hub" element={token?.token ? <ResultHub /> : <Navigate to="/login" />} />
          <Route path="/stats" element={token?.token ? <Setting /> : <Navigate to="/login" />} />
          <Route path="/login" element={!token?.token ? <Login /> : <Navigate to="/" />} />
        </Routes>
      </main>
      {token?.token && (
        <nav className="fixed bottom-0 left-0 right-0 bg-[#1E2C3A] border-t border-[#2B3B4D]">
          <div className="flex justify-around items-center h-16">
            <NavLink to="/" Icon={HomeIcon} label="Home" />
            <NavLink to="/result-hub" Icon={ResultIcon} label="Results" />
            <NavLink to="/stats" Icon={StatsIcon} label="Stats" />
            <button
              onClick={handleLogout}
              className="flex flex-col items-center justify-center w-full h-full text-[#A4B8D1] hover:text-[#54A7E5] transition-colors"
            >
              <LogoutIcon active={false} />
              <span className="text-xs mt-1">Logout</span>
            </button>
          </div>
        </nav>
      )}
    </div>
  );
}

const NavLink = ({ to, Icon, label }: { to: string; Icon: React.FC<{ active: boolean }>; label: string }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link 
      to={to} 
      className={`flex flex-col items-center justify-center w-full h-full ${
        isActive ? 'text-[#54A7E5]' : 'text-[#A4B8D1] hover:text-[#54A7E5]'
      } transition-colors`}
    >
      <Icon active={isActive} />
      <span className="text-xs mt-1">{label}</span>
    </Link>
  );
};

export default App;