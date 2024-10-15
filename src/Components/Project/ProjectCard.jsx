
"use client";

import { Button, Card } from "flowbite-react";

const ProjectCard = ({ name, location, dueDate }) => {
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
    </Card>
  );
};

export default ProjectCard;