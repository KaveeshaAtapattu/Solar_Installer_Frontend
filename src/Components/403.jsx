import React from 'react';
import { useNavigate } from 'react-router-dom';

const Forbidden = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate('/installer'); // Redirect back to the installer dashboard or other page
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>403 - Forbidden</h1>
      <p>You do not have permission to access this page.</p>
      <button 
        onClick={goBack} 
        style={{ padding: '10px 20px', marginTop: '20px', cursor: 'pointer', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px' }}>
        Go Back
      </button>
    </div>
  );
};

export default Forbidden;
