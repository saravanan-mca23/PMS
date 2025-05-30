import React from 'react';
import { FiUsers, FiBriefcase, FiCalendar } from 'react-icons/fi';

const QuickStats = ({ employees, projects }) => {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
              <FiUsers className="h-6 w-6 text-white" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dt className="text-sm font-medium text-gray-500 truncate">Total Employees</dt>
              <dd className="text-2xl font-semibold text-gray-900">{employees.length}</dd>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
              <FiBriefcase className="h-6 w-6 text-white" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dt className="text-sm font-medium text-gray-500 truncate">Active Projects</dt>
              <dd className="text-2xl font-semibold text-gray-900">{projects.length}</dd>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
              <FiCalendar className="h-6 w-6 text-white" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dt className="text-sm font-medium text-gray-500 truncate">Upcoming Deadlines</dt>
              <dd className="text-2xl font-semibold text-gray-900">
                {projects.filter(p => new Date(p.deadline) > new Date()).length}
              </dd>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickStats;