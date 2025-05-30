import React, { useState } from 'react';
import { FiBriefcase } from 'react-icons/fi';

const ProjectForm = ({ onSubmit }) => {
  const [project, setProject] = useState({ name: '', description: '', deadline: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resetForm = await onSubmit(project);
    if (resetForm) {
      setProject(resetForm);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
          <FiBriefcase className="mr-2" /> Add New Project
        </h3>
        <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <div className="sm:col-span-3">
            <label htmlFor="project-name" className="block text-sm font-medium text-gray-700">
              Project Name *
            </label>
            <input
              type="text"
              id="project-name"
              value={project.name}
              onChange={(e) => setProject({ ...project, name: e.target.value })}
              className="mt-1 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="sm:col-span-3">
            <label htmlFor="project-deadline" className="block text-sm font-medium text-gray-700">
              Deadline *
            </label>
            <input
              type="date"
              id="project-deadline"
              value={project.deadline}
              onChange={(e) => setProject({ ...project, deadline: e.target.value })}
              className="mt-1 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="sm:col-span-6">
            <label htmlFor="project-description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="project-description"
              rows={3}
              value={project.description}
              onChange={(e) => setProject({ ...project, description: e.target.value })}
              className="mt-1 shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
            />
          </div>

          <div className="sm:col-span-6">
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Add Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectForm;