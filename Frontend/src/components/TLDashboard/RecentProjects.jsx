import React from 'react';
import { FiClock } from 'react-icons/fi';

const RecentProjects = ({ projects }) => {
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
        <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
          <FiClock className="mr-2" /> Recent Projects
        </h3>
      </div>
      <div className="bg-white overflow-hidden">
        <ul className="divide-y divide-gray-200">
          {projects.slice(0, 5).map((project) => (
            <li key={project._id} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center min-w-0">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-blue-600 truncate">{project.name}</p>
                    <p className="text-sm text-gray-500 truncate">{project.description}</p>
                  </div>
                </div>
                <div className="ml-4 flex-shrink-0">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      new Date(project.deadline) < new Date()
                        ? 'bg-red-100 text-red-800'
                        : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {new Date(project.deadline).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Work Details Section */}
              {project.workDetails && project.workDetails.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-md font-semibold text-gray-800">Work Details:</h4>
                  <ul className="divide-y divide-gray-200 mt-2">
                    {project.workDetails.map((work, index) => (
                      <li key={index} className="py-2">
                        <p className="text-sm text-gray-600">Employee: {work.employeeName}</p>
                        <p className="text-sm text-gray-600">Hours Worked: {work.hours}</p>
                        <p className="text-sm text-gray-600">Date: {new Date(work.date).toLocaleDateString()}</p>
                        <p className="text-sm text-gray-600">Status Before: {work.statusBefore}</p>
                        <p className="text-sm text-gray-600">Status After: {work.statusAfter}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RecentProjects;
