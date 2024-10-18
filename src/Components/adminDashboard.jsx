// src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import ProjectCard from './Project/ProjectCard';
import LogoutButton from './Authentication/logoutButton';


const Dashboard = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

      

      console.log('data',projects?.data);
      console.log('projects',projects);

      if (loading) {
        return <p>Loading projects...</p>;
      }
    
      if (error) {
        return <p>Error: {error}</p>;
      }
  return (
    <>
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      <p>Welcome to the Solar Installer Admin Dashboard!</p>
    </div>
    <LogoutButton />

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
