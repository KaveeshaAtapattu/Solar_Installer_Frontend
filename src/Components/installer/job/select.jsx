// src/Components/installer/job/SelectProject.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import Status from './Status'; // Corrected import path

// Modal configuration (set to center the modal)
Modal.setAppElement('#root'); // Replace '#root' with the appropriate ID of your root element if necessary

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
      return 'bg-green-200'; // Green for completed
    } else if (project.AttendedAt) {
      return 'bg-blue-200'; // Blue for attended
    }
    return 'bg-white'; // Default white for others
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Select a Project to Update Status</h2>
      {isLoading ? (
        <p className="text-gray-500">Loading projects...</p>
      ) : projects.length === 0 ? (
        <p className="text-gray-500">No projects available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className={`p-4 border border-gray-300 rounded-lg shadow-md transition-transform transform hover:scale-105 ${getCardColor(project)}`}
            >
              <div className="flex flex-col space-y-2">
                <h3 className="text-lg font-semibold text-gray-800">{project.projectName}</h3>
                <p className="text-gray-600">Location: {project.location}</p>
                <p className="text-gray-600">Due Date: {new Date(project.dueDate).toLocaleDateString()}</p>
                {project.AttendedAt && (
                  <p className="text-gray-600">Attended At: {new Date(project.AttendedAt).toLocaleString()}</p>
                )}
                {project.CompletedAt && (
                  <p className="text-gray-600">Completed At: {new Date(project.CompletedAt).toLocaleString()}</p>
                )}
              </div>
              <button
                className={`mt-4 px-4 py-2 rounded-lg text-white transition-colors ${project.CompletedAt ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600 cursor-pointer'}`}
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
        className="relative bg-white rounded-lg p-8 shadow-xl max-w-md mx-auto mt-20"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        {selectedProject && (
          <Status
            project={selectedProject}
            disableArriveButton={!!selectedProject.AttendedAt} // Disable "Arrive" if already marked
            disableCompleteButton={!!selectedProject.CompletedAt} // Disable "Complete" if already marked as completed
          />
        )}
        <button
          className="w-full mt-4 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg"
          onClick={closeModal}
        >
          Close
        </button>
      </Modal>
    </div>
  );
};

export default SelectProject;
