// src/Components/installer/job/Status.jsx
import React, { useState } from 'react';
import axios from 'axios';

const Status = ({ project, disableArriveButton, disableCompleteButton }) => {
  const [message, setMessage] = useState('');
  const [isArrived, setIsArrived] = useState(!!project.AttendedAt); // Pre-set based on project status
  const [isCompleted, setIsCompleted] = useState(!!project.CompletedAt); // Pre-set based on project status

  const handleMarkAsArrived = () => {
    axios.put(`http://localhost:8080/projects/${project.id}/arrive`)
      .then(response => {
        setMessage(response.data.message);
        setIsArrived(true); // Update the state to reflect the status
      })
      .catch(error => {
        setMessage('Error marking as arrived');
        console.error('There was an error marking the project as arrived!', error);
      });
  };

  const handleMarkAsCompleted = () => {
    axios.put(`http://localhost:8080/projects/${project.id}/complete`)
      .then(response => {
        setMessage(response.data.message);
        setIsCompleted(true); // Update the state to reflect the status
      })
      .catch(error => {
        setMessage('Error marking as completed');
        console.error('There was an error marking the project as completed!', error);
      });
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Update Status for Project: {project.projectName}</h3>
      <p className="text-gray-600 mb-2">Location: {project.location}</p>
      <p className="text-gray-600 mb-4">Due Date: {new Date(project.dueDate).toLocaleDateString()}</p>

      {/* Button for Mark as Arrived */}
      <button
        onClick={handleMarkAsArrived}
        disabled={isArrived || disableArriveButton} // Disable if already arrived or passed via props
        className={`w-full py-2 mb-4 rounded-lg text-white font-semibold transition-colors ${
          isArrived || disableArriveButton
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-green-500 hover:bg-green-600 cursor-pointer'
        }`}
      >
        {isArrived ? 'Already Arrived' : 'Mark as Arrived'}
      </button>

      {/* Button for Mark as Completed */}
      <button
        onClick={handleMarkAsCompleted}
        disabled={!isArrived || isCompleted || disableCompleteButton} // Enable only if arrived and not completed
        className={`w-full py-2 mb-4 rounded-lg text-white font-semibold transition-colors ${
          !isArrived || isCompleted || disableCompleteButton
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-500 hover:bg-blue-600 cursor-pointer'
        }`}
      >
        {isCompleted ? 'Already Completed' : 'Mark as Completed'}
      </button>

      {/* Message section */}
      {message && <p className="text-red-500 mt-2">{message}</p>}
    </div>
  );
};

export default Status;
