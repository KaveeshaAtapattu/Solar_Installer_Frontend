// src/Components/admin/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear token and user data from local storage
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('role');

    // Navigate to the signout page
    navigate('/signout');

    // Reload the page to ensure all state resets
    window.location.reload();
  };

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-8">
          {/* Logo or Brand Name */}
          <Link to="/admin/dashboard" className="text-2xl font-bold text-white hover:text-gray-200">
            Admin Dashboard
          </Link>

          {/* Admin Navbar links */}
          <Link
            to="/admin/projects/new"
            className="text-white font-medium hover:text-gray-200 transition duration-300"
          >
            Add Project
          </Link>
          <Link
            to="/register"
            className="text-white font-medium hover:text-gray-200 transition duration-300"
          >
            Add User
          </Link>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 transition duration-300 px-4 py-2 rounded text-white font-semibold"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
