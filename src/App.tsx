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