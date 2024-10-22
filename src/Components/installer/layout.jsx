// src/Components/installer/InstallerLayout.jsx
import React from 'react';
import SelectProject from './job/Select';
import Navbar from './navbar';

const InstallerLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Installer Dashboard
        </h1>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <SelectProject />
        </div>
      </div>
    </div>
  );
};

export default InstallerLayout;
