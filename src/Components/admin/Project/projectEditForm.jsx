// src/Components/admin/Project/projectEditForm.jsx
"use client";

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Ensure useParams is imported
import { Button, Label, TextInput, Card } from "flowbite-react";

export default function ProjectEditForm() {
  const { id } = useParams(); // Get project ID from the URL
  const navigate = useNavigate(); // For navigation after update
  const [formData, setFormData] = useState({
    projectName: "",
    location: "",
    dueDate: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch project data on mount
    const fetchProject = async () => {
      try {
        const response = await fetch(`http://localhost:8080/projects/${id}`); // Fetch project by ID
        if (!response.ok) {
          throw new Error("Failed to fetch project");
        }

        const project = await response.json();
        const dataset = project.data;

        // Populate the form fields
        setFormData({
          projectName: dataset.projectName,  // Ensure these field names match your backend response
          location: dataset.location,
          dueDate: dataset.dueDate
            ? new Date(dataset.dueDate).toISOString().split("T")[0]
            : "",
        });

        setLoading(false);
      } catch (error) {
        console.error("Error fetching project:", error);
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // Submit form data to update the project
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      projectName: formData.projectName,
      location: formData.location,
      dueDate: new Date(formData.dueDate).toISOString(),
    };

    try {
      const response = await fetch(`http://localhost:8080/projects/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to update project");
      }

      alert("Project updated successfully!");
      navigate("/admin/dashboard"); // Redirect after successful update
    } catch (error) {
      console.error("Error updating project:", error);
      alert("Failed to update project.");
    }
  };

  if (loading) {
    return <p>Loading project...</p>; // Loading state
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <h1 className="text-2xl font-semibold text-center mb-4">Update Project</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <Label htmlFor="projectName" value="Project Name" />
            <TextInput
              id="projectName"
              type="text"
              placeholder="Enter project name"
              value={formData.projectName}
              onChange={handleChange}
              required
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="location" value="Location" />
            <TextInput
              id="location"
              type="text"
              placeholder="Enter location"
              value={formData.location}
              onChange={handleChange}
              required
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="dueDate" value="Due Date" />
            <TextInput
              id="dueDate"
              type="date"
              value={formData.dueDate}
              onChange={handleChange}
              required
              className="mt-1"
            />
          </div>

          <Button type="submit" className="mt-4 bg-blue-600 hover:bg-blue-700">
            Update Project
          </Button>
        </form>
      </Card>
    </div>
  );
}
