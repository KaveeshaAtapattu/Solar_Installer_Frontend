import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AdminLayout from './Components/admin/layout';
import InstallerLayout from './Components/installer/layout';
import Login from './Components/authentication/Login';
import Register from './Components/authentication/Register';
import SignOut from './Components/authentication/SignOut';
import axios from 'axios';
import './App.css';

function App() {
  const [role, setRole] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedRole = localStorage.getItem('role');

    if (token) {
      axios.post('http://localhost:8080/validateToken', { token })
        .then(response => {
          if (response.data.valid) {
            setIsAuthenticated(true);
            setRole(savedRole);
          } else {
            localStorage.removeItem('token');
            localStorage.removeItem('role');
            localStorage.removeItem('user');
            setIsAuthenticated(false);
          }
        })
        .catch(error => {
          console.error('Token validation failed:', error);
          setIsAuthenticated(false);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setIsAuthenticated(false);
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>;  // Customize this as needed
  }

  return (
    <Router>
      <Routes>
        {/* Login Route */}
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              role === 'admin' ? <Navigate to="/admin" /> : <Navigate to="/installer" />
            ) : (
              <Login />
            )
          }
        />

        {/* Protected Admin Routes */}
        {isAuthenticated && role === 'admin' ? (
          <>
            <Route path="/admin/*" element={<AdminLayout />} />
            <Route path="/register" element={<Register />} />
            <Route path="/signout" element={<SignOut />} />
          </>
        ) : (
          <>
            <Route path="/admin/*" element={<Navigate to="/login" />} />
            <Route path="/register" element={<Navigate to="/login" />} />
          </>
        )}

        {/* Protected Installer Routes */}
        {isAuthenticated && role === 'installer' ? (
          <>
            <Route path="/installer/*" element={<InstallerLayout />} />
            <Route path="/signout" element={<SignOut />} />
          </>
        ) : (
          <Route path="/installer/*" element={<Navigate to="/login" />} />
        )}

        {/* Redirect Based on Role */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              role === 'admin' ? <Navigate to="/admin" /> : <Navigate to="/installer" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Catch-All Route */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
