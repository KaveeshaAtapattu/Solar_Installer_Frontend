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
        setProjects(data);
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
    return <p>Loading projects...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>

      <div className="m-3 flex flex-wrap items-center justify-center gap-4">
        {projects.data.map((project) => (
          <ProjectCard
            key={project.id}
            name={project.projectName}
            location={project.location}
            dueDate={project.dueDate}
            id={project.id}
          />
        ))}
      </div>
    </>
  );
};

export default Dashboard;
