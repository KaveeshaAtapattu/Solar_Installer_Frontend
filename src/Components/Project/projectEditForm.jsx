"use client";

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";

export default function ProjectForm() {
  const { id } = useParams(); // Get project ID from the URL
  const navigate = useNavigate(); // For navigation after update
  const [formData, setFormData] = useState({
    projectName: "",
    location: "",
    dueDate: "",
    status: false,
  });

  const [loading, setLoading] = useState(true);

  // Fetch project data on mount
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(`http://localhost:8080/projects/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch project");
        }

        const project = await response.json();
        console.log("Fetched project:", project); // Log project data
        console.log("Fetched project:", project.data);
        
        const dataset= project.data// Log project data
        
        console.log("data set:", dataset);

        setFormData({
          projectName: dataset.ProjectName , 
          location: dataset.Location , 
          dueDate: dataset.DueDate
            ? new Date(dataset.DueDate).toISOString().split("T")[0]
            : "", // Handle invalid date
          status: dataset.Status || false,
        });

        setLoading(false);
      } catch (error) {
        console.error("Error fetching project:", error);
        setLoading(false);
      }
    };

    fetchProject();
  }, []);

  console.log('data e',formData);

  // Handle input changes
  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  // Submit form data to update the project
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      projectName: formData.projectName,
      location: formData.location,
      dueDate: new Date(formData.dueDate).toISOString(),
      status: formData.status,
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
      navigate("/"); // Redirect after successful update
    } catch (error) {
      console.error("Error updating project:", error);
      alert("Failed to update project.");
    }
  };

  if (loading) {
    return <p>Loading project...</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-md flex-col gap-4">
      <div>
        <Label htmlFor="projectName" value="Project Name" />
        <TextInput
          id="projectName"
          type="text"
          placeholder="Enter project name"
          value={formData.projectName}
          onChange={handleChange}
          required
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
        />
      </div>

      <div className="flex items-center gap-2">
        <Checkbox
          id="status"
          checked={formData.status}
          onChange={handleChange}
        />
        <Label htmlFor="status">Completed</Label>
      </div>

      <Button type="submit">Update Project</Button>
    </form>
  );
}
