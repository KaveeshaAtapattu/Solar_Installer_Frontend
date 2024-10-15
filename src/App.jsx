import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './Components/adminDashboard';
import Navbar from './Components/Navbar'
import  ProjectForm  from './Components/Project/projectForm';
import  ProjectEditForm  from './Components/Project/projectEditForm';
import './App.css'
import Register from './Components/Authentication/Register';
import Login from './Components/Authentication/Login';
import ProtectedPage from './Components/Authentication/ProtectedPage';

function App() {

  return (
    <>
     <Navbar />
     <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/projects/add" element={<ProjectForm />} />
        <Route path="/projects/:id" element={<ProjectEditForm />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/test" element={<ProtectedPage />} />


        
        
      </Routes>
    </Router>
      
    </>
  )
}

export default App
