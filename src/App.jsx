import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './Components/adminDashboard';
import Navbar from './Components/Navbar'
import './App.css'

function App() {

  return (
    <>
     <Navbar />
     <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/projects" element={<Dashboard />} />
        
      </Routes>
    </Router>
      
    </>
  )
}

export default App
