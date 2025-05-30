import React from 'react';
import { FiBriefcase } from 'react-icons/fi';

const ProjectList = ({ projects, onDeleteProject }) => {
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
        <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
          <FiBriefcase className="mr-2" /> All Projects
        </h3>
      </div>
      <div className="bg-white overflow-hidden">
        <ul className="divide-y divide-gray-200">
          {projects.map((project) => (
            <li key={project._id} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center">
                    <p className="text-sm font-medium text-gray-900 truncate">{project.name}</p>
                    <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {new Date(project.deadline) < new Date() ? 'Overdue' : 'Active'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 truncate mt-1">{project.description}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Deadline: {new Date(project.deadline).toLocaleDateString()}
                  </p>
                </div>
                <div className="ml-4 flex-shrink-0">
                  <button
                    onClick={() => onDeleteProject(project._id)}
                    className="text-red-600 hover:text-red-900 text-sm font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProjectList;