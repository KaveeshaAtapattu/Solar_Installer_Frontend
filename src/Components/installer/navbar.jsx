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
    <nav className="bg-blue-600 p-4 text-white">
      <div className="container mx-auto flex justify-between">
        <div className="flex space-x-4">
        </div>
        <button onClick={handleLogout} className="bg-red-500 px-3 py-2 rounded hover:bg-red-700">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
