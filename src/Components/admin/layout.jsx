// src/Components/admin/layout.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './dashboard';
import ProjectForm from './Project/projectForm';
import ProjectEditForm from './Project/projectEditForm';
import Navbar from './Navbar';

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <Navbar /> {/* Navbar visible on all pages */}

      <div className="content-area">
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
