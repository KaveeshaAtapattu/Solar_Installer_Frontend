
"use client";

import { Button, Card } from "flowbite-react";

const ProjectCard = ({ name, location, dueDate ,id }) => {

    console.log(id)
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
          navigate("/"); 
        } catch (error) {
          console.error("Error deleting project:", error);
          alert("Failed to delete project.");
        }
      };
  return (
    <Card className="min-w-xl m-3">
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {name}
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        {location}
      </p>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        {dueDate}
      </p>
      <Button>
        Read more
       
      </Button>
      <Button color="red"
        onClick={handleDelete}
      >
        delete
      </Button>
    </Card>
  );
};

export default ProjectCard;