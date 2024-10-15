"use client";

import React, { useState } from "react";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";

export default function ProjectForm() {
  const [formData, setFormData] = useState({
    projectName: "",
    location: "",
    dueDate: "",
    status: false,
  });

  // Handle input changes
  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
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
      status: formData.status,
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
        status: false,
      });
    } catch (error) {
      console.error("Error submitting project:", error);
      alert("Failed to submit project.");
    }


  };

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

      <Button type="submit">Submit Project</Button>
    </form>
  );
}
