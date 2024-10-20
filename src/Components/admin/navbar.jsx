// src/Components/admin/navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear token and user data from local storage
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('role');
    
    // Navigate to the login page
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 p-4 text-white">
      <div className="container mx-auto flex justify-between">
        <div className="flex space-x-4">
          {/* Admin Navbar links */}
          <Link to="/admin/dashboard" className="hover:text-gray-300">Dashboard</Link>
          <Link to="/admin/projects/new" className="hover:text-gray-300">Add Project</Link>
        </div>
        <button onClick={handleLogout} className="bg-red-500 px-3 py-2 rounded hover:bg-red-700">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
