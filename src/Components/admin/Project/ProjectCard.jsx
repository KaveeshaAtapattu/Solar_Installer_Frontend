// src/Components/admin/Project/ProjectCard.jsx
"use client";

import { Button, Card, Modal } from "flowbite-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa"; // Importing edit icon

const ProjectCard = ({ name, location, dueDate, id }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate(); // For navigation to edit page

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this project?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:8080/projects/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete project");
      }

      alert("Project deleted successfully!");
      // Refresh or redirect after deletion
      navigate("/admin/dashboard"); 
    } catch (error) {
      console.error("Error deleting project:", error);
      alert("Failed to delete project.");
    }
  };

  // Navigate to the project edit page
  const handleEdit = () => {
    navigate(`/admin/projects/${id}/edit`); // Add '/admin' prefix
  };
  

  return (
    <>
      <Card className="min-w-xl m-3">
        <div className="flex justify-between">
          <div>
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {name}
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              {location}
            </p>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              {dueDate}
            </p>
          </div>
          {/* Edit Icon */}
          <FaEdit
            className="text-blue-500 cursor-pointer"
            onClick={handleEdit} // Handle edit click
            size={24}
            title="Edit Project"
          />
        </div>
        <Button onClick={openModal}>
          Read more
        </Button>
        <Button color="red" onClick={handleDelete}>
          Delete
        </Button>
      </Card>

      <Modal show={isModalOpen} onClose={closeModal}>
        <Modal.Header>
          Project Details
        </Modal.Header>
        <Modal.Body>
          <p><strong>Name:</strong> {name}</p>
          <p><strong>Location:</strong> {location}</p>
          <p><strong>Due Date:</strong> {dueDate}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProjectCard;
