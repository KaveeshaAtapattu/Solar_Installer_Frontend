// src/Components/admin/layout.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './dashboard';
import ProjectForm from './Project/projectForm';
import ProjectEditForm from './Project/projectEditForm';
import Navbar from './navbar';

const AdminLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Navbar visible on all pages */}
      <Navbar />

      {/* Main content area */}
      <div className="flex-1 container mx-auto p-6 mt-4">
        <Routes>
          {/* Admin Dashboard */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Project Management */}
          <Route path="/projects/new" element={<ProjectForm />} />
          <Route path="/projects/:id/edit" element={<ProjectEditForm />} /> {/* Edit route */}

          {/* Default route */}
          <Route path="/" element={<Navigate to="/admin/dashboard" />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminLayout;
