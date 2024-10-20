"use client";

import React, { useState } from "react";
import { Button, Label, TextInput, Card } from "flowbite-react";

export default function ProjectForm() {
  const [formData, setFormData] = useState({
    projectName: "",
    location: "",
    dueDate: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // Submit form data to the backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare payload with correct field names and types
    const payload = {
      projectName: formData.projectName,
      location: formData.location,
      dueDate: new Date(formData.dueDate).toISOString(), // Ensure ISO date format
    };

    console.log("Payload:", payload); // Debug payload before sending

    try {
      const response = await fetch("http://localhost:8080/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      console.log("Response:", result);

      if (!response.ok) {
        throw new Error(result.message || "Failed to submit project details");
      }

      alert("Project submitted successfully!");

      setFormData({
        projectName: "",
        location: "",
        dueDate: "",
      });
    } catch (error) {
      console.error("Error submitting project:", error);
      alert("Failed to submit project.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <h1 className="text-2xl font-semibold text-center mb-4">New Project</h1>
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
            Submit Project
          </Button>
        </form>
      </Card>
    </div>
  );
}
