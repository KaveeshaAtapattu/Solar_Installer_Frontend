import React from 'react';

const LogoutButton = () => {
    const handleLogout = () => {
        // Clear user details and token from local storage
        localStorage.removeItem('user');
        localStorage.removeItem('token');

        // Optionally, redirect to the login page
        window.location.href = '/login'; 
    };

    return (
        <button onClick={handleLogout} className="bg-red-500 text-white p-2 rounded">
            Logout
        </button>
    );
};

export default LogoutButton;
