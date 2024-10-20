import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import Status from './Status'; // Corrected import path

// Modal configuration (set to center the modal)
Modal.setAppElement('#root'); // Replace '#root' with the appropriate ID of your root element if necessary

const cardStyle = {
  border: '1px solid #ddd',
  borderRadius: '8px',
  padding: '16px',
  margin: '16px 0',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const buttonStyle = {
  padding: '8px 16px',
  border: 'none',
  backgroundColor: '#007bff',
  color: '#fff',
  borderRadius: '4px',
  cursor: 'pointer',
};

const SelectProject = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch projects from the backend hosted at localhost:8080
    axios.get('http://localhost:8080/projects')
      .then(response => {
        setProjects(response.data.data || []);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('There was an error fetching the projects!', error);
        setIsLoading(false);
      });
  }, []);

  const handleSelect = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
    setSelectedProject(null); // Clear the selected project
  };

  const getCardColor = (project) => {
    if (project.CompletedAt) {
      return '#28a745'; // Green for completed
    } else if (project.AttendedAt) {
      return '#007bff'; // Blue for attended
    }
    return '#fff'; // Default white for others
  };

  return (
    <div>
      <h2>Select a Project to Update Status</h2>
      {isLoading ? (
        <p>Loading projects...</p>
      ) : projects.length === 0 ? (
        <p>No projects available.</p>
      ) : (
        <div>
          {projects.map((project) => (
            <div key={project.id} style={{ ...cardStyle, backgroundColor: getCardColor(project) }}>
              <div>
                <h3>{project.projectName}</h3>
                <p>Location: {project.location}</p>
                <p>Due Date: {new Date(project.dueDate).toLocaleDateString()}</p>
                {project.AttendedAt && <p>Attended At: {new Date(project.AttendedAt).toLocaleString()}</p>}
                {project.CompletedAt && <p>Completed At: {new Date(project.CompletedAt).toLocaleString()}</p>}
              </div>
              <button
                style={{
                  ...buttonStyle,
                  backgroundColor: project.CompletedAt ? '#6c757d' : '#007bff',
                  cursor: project.CompletedAt ? 'not-allowed' : 'pointer',
                }}
                onClick={() => handleSelect(project)}
                disabled={project.CompletedAt} // Disable only if completed
              >
                {project.CompletedAt ? 'Marked as Completed' : 'Update Status'}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Modal for Status update */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Update Project Status"
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            padding: '20px',
            borderRadius: '10px',
            width: '400px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
          },
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
          },
        }}
      >
        {selectedProject && (
          <Status
            project={selectedProject}
            disableArriveButton={!!selectedProject.AttendedAt} // Disable "Arrive" if already marked
            disableCompleteButton={!!selectedProject.CompletedAt} // Disable "Complete" if already marked as completed
          />
        )}
        <button
          style={{
            padding: '8px 16px',
            backgroundColor: '#dc3545',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            width: '100%',
            marginTop: '10px',
          }}
          onClick={closeModal}
        >
          Close
        </button>
      </Modal>
    </div>
  );
};

export default SelectProject;
