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
    <div>
      <h3>Update Status for Project: {project.projectName}</h3>
      <p>Location: {project.location}</p>
      <p>Due Date: {new Date(project.dueDate).toLocaleDateString()}</p>

      <button
        onClick={handleMarkAsArrived}
        disabled={isArrived || disableArriveButton} // Disable if already arrived or passed via props
        style={{
          padding: '10px 20px',
          backgroundColor: (isArrived || disableArriveButton) ? '#6c757d' : '#28a745',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: (isArrived || disableArriveButton) ? 'not-allowed' : 'pointer',
          width: '100%',
          marginBottom: '10px'
        }}
      >
        {isArrived ? 'Already Arrived' : 'Mark as Arrived'}
      </button>

      <button
        onClick={handleMarkAsCompleted}
        disabled={!isArrived || isCompleted || disableCompleteButton} // Enable only if arrived and not completed
        style={{
          padding: '10px 20px',
          backgroundColor: (!isArrived || isCompleted || disableCompleteButton) ? '#6c757d' : '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: (!isArrived || isCompleted || disableCompleteButton) ? 'not-allowed' : 'pointer',
          width: '100%',
          marginBottom: '10px'
        }}
      >
        {isCompleted ? 'Already Completed' : 'Mark as Completed'}
      </button>

      {message && <p style={{ color: 'red', marginTop: '10px' }}>{message}</p>}
    </div>
  );
};

export default Status;
