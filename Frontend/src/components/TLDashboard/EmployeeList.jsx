import React from 'react';
import { FiUsers } from 'react-icons/fi';

const EmployeeList = ({ employees, onDeleteEmployee }) => {
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
        <h3 className="text-lg leading-6 font-medium text-gray-900 flex items-center">
          <FiUsers className="mr-2" /> All Employees
        </h3>
      </div>
      <div className="bg-white overflow-hidden">
        <ul className="divide-y divide-gray-200">
          {employees.map((employee) => (
            <li key={employee._id} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center min-w-0">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                    <span className="text-gray-600 font-medium">
                      {employee.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </span>
                  </div>
                  <div className="ml-4 min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900 truncate">{employee.name}</p>
                    <p className="text-sm text-gray-500 truncate">{employee.email}</p>
                  </div>
                </div>
                <div className="ml-4 flex-shrink-0 flex space-x-2">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${employee.role === 'Team Lead' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}`}>
                    {employee.role}
                  </span>
                  <button
                    onClick={() => onDeleteEmployee(employee._id)}
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

export default EmployeeList;