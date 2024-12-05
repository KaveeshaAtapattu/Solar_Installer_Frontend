// src/Components/admin/Project/ProjectCard.jsx
"use client";

import { Button, Card, Modal } from "flowbite-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa"; // Importing icons for edit and delete

const ProjectCard = ({ name, location, dueDate, id, completedAt, attendedAt }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

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
      navigate("/admin/dashboard");
    } catch (error) {
      console.error("Error deleting project:", error);
      alert("Failed to delete project.");
    }
  };

  // Navigate to the project edit page
  const handleEdit = () => {
    navigate(`/admin/projects/${id}/edit`);
  };

  // Determine card background color based on completion and attendance status
  const getCardBackgroundColor = () => {
    if (completedAt) {
      return "bg-red-100 border-red-200"; // Light red for completed projects
    } else if (attendedAt) {
      return "bg-blue-100 border-blue-200"; // Light blue for attended projects
    }
    return "bg-white border-gray-200"; // Default white for other projects
  };

  return (
    <>
      <Card className={`w-full lg:w-96 m-3 shadow-md dark:bg-gray-800 dark:border-gray-700 ${getCardBackgroundColor()}`}>
        <div className="flex justify-between items-center">
          <div>
            <h5 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {name}
            </h5>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <strong>Location:</strong> {location}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <strong>Due Date:</strong> {new Date(dueDate).toLocaleDateString()}
            </p>
            {completedAt && (
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <strong>Completed At:</strong> {new Date(completedAt).toLocaleString()}
              </p>
            )}
            {attendedAt && !completedAt && (
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <strong>Attended At:</strong> {new Date(attendedAt).toLocaleString()}
              </p>
            )}
          </div>
          <div className="flex gap-2">
            <FaEdit
              className="text-blue-500 hover:text-blue-600 cursor-pointer"
              onClick={handleEdit}
              size={20}
              title="Edit Project"
            />
            <FaTrashAlt
              className="text-red-500 hover:text-red-600 cursor-pointer"
              onClick={handleDelete}
              size={20}
              title="Delete Project"
            />
          </div>
        </div>
        <Button color="light" className="mt-3" onClick={openModal}>
          View Details
        </Button>
      </Card>

      <Modal show={isModalOpen} onClose={closeModal}>
        <Modal.Header className="text-lg font-medium">
          Project Details
        </Modal.Header>
        <Modal.Body className="space-y-2">
          <p>
            <strong>Name:</strong> {name}
          </p>
          <p>
            <strong>Location:</strong> {location}
          </p>
          <p>
            <strong>Due Date:</strong> {new Date(dueDate).toLocaleDateString()}
          </p>
          {completedAt && (
            <p>
              <strong>Completed At:</strong> {new Date(completedAt).toLocaleString()}
            </p>
          )}
          {attendedAt && !completedAt && (
            <p>
              <strong>Attended At:</strong> {new Date(attendedAt).toLocaleString()}
            </p>
          )}
        </Modal.Body>
        <Modal.Footer className="flex justify-end">
          <Button onClick={closeModal} color="blue">
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProjectCard;
