// src/Components/admin/dashboard.jsx
import React, { useEffect, useState } from 'react';
import ProjectCard from './Project/ProjectCard';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // For navigation to signout route

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('http://localhost:8080/projects/');
        
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        const data = await response.json();
        setProjects(data.data || []); // Assuming that the data is under a "data" property
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Function to handle logout and navigate to /signout route
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('role');
    navigate('/signout');
  };

  if (loading) {
    return <p className="text-center mt-10 text-gray-600">Loading projects...</p>;
  }

  if (error) {
    return <p className="text-center mt-10 text-red-600">Error: {error}</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Projects Dashboard</h1>
        <div className="flex flex-wrap justify-center gap-4">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              name={project.projectName}
              location={project.location}
              dueDate={project.dueDate}
              id={project.id}
              completedAt={project.CompletedAt}
              attendedAt={project.AttendedAt}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
