import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiX, FiCalendar, FiUsers, FiBriefcase, FiHome, FiLogOut } from 'react-icons/fi';
import axios from 'axios';
import CalendarModal from '../components/TLDashboard/CalendarModal';
import EmployeeList from '../components/TLDashboard/EmployeeList';
import ProjectForm from '../components/TLDashboard/ProjectForm';
import ProjectList from '../components/TLDashboard/ProjectList';
import QuickStats from '../components/TLDashboard/QuickStats';
import RecentProjects from '../components/TLDashboard/RecentProjects';

const TLDashboard = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [projects, setProjects] = useState([]);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(true);
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const user = JSON.parse(localStorage.getItem('user')) || {};

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        await Promise.all([fetchEmployees(), fetchProjects()]);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}:5000/api/employees`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
      throw error;
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/projects`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
      throw error;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-lg font-medium text-gray-700">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex flex-col bg-gray-50 overflow-hidden">
      {/* Header with Navbar */}
      <header className="bg-white shadow-sm">
        <div className="flex flex-col">
          {/* Top Bar with User Info */}
          <div className="h-16 px-6 flex justify-between items-center">
            <h1 className="text-xl font-bold text-gray-900">Team Lead Dashboard</h1>
            <div className="flex items-center space-x-4">
              <div className="text-right hidden md:block">
                <p className="text-sm font-medium text-gray-700">{user.name}</p>
                <p className="text-xs text-gray-500">{user.role}</p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 px-3 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
              >
                <FiLogOut className="h-4 w-4 text-xs text-gray-500" />
                <span className="hidden sm:inline text-xs text-gray-500">Logout</span>
              </button>
            </div>
          </div>

          {/* Navigation Bar */}
          <nav className="border-t border-gray-200">
            <div className="flex overflow-x-auto">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`flex items-center px-4 py-3 text-sm font-medium whitespace-nowrap ${activeTab === 'dashboard' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700 hover:border-b-2 hover:border-gray-300'}`}
              >
                <FiHome className="h-5 w-5 mr-2" />
                <span>Dashboard</span>
              </button>
              <button
                onClick={() => setActiveTab('employees')}
                className={`flex items-center px-4 py-3 text-sm font-medium whitespace-nowrap ${activeTab === 'employees' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700 hover:border-b-2 hover:border-gray-300'}`}
              >
                <FiUsers className="h-5 w-5 mr-2" />
                <span>Employees</span>
              </button>
              <button
                onClick={() => setActiveTab('projects')}
                className={`flex items-center px-4 py-3 text-sm font-medium whitespace-nowrap ${activeTab === 'projects' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700 hover:border-b-2 hover:border-gray-300'}`}
              >
                <FiBriefcase className="h-5 w-5 mr-2" />
                <span>Projects</span>
              </button>
              <button
                onClick={() => setShowCalendarModal(true)}
                className="flex items-center px-4 py-3 text-sm font-medium text-gray-500 hover:text-gray-700 whitespace-nowrap hover:border-b-2 hover:border-gray-300"
              >
                <FiCalendar className="h-5 w-5 mr-2" />
                <span>Calendar</span>
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
        {/* Dashboard View */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <QuickStats employees={employees} projects={projects} />
            <RecentProjects projects={projects} />
          </div>
        )}

        {/* Employees View */}
        {activeTab === 'employees' && (
          <EmployeeList 
            employees={employees} 
            onDeleteEmployee={async (id) => {
              if (window.confirm('Are you sure you want to delete this employee?')) {
                try {
                  await axios.delete(`${import.meta.env.VITE_API_URL}/api/employees/${id}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                  });
                  await fetchEmployees();
                } catch (error) {
                  console.error('Error deleting employee:', error);
                  alert('Failed to delete employee. Please try again.');
                }
              }
            }} 
          />
        )}

        {/* Projects View */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <ProjectForm 
              onSubmit={async (newProject) => {
                if (!newProject.name || !newProject.deadline) {
                  alert('Please fill in all required fields');
                  return;
                }
                try {
                  await axios.post('${import.meta.env.VITE_API_URL}/api/projects', newProject, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                  });
                  await fetchProjects();
                  return { name: '', description: '', deadline: '' }; // Reset form
                } catch (error) {
                  console.error('Error adding project:', error);
                  alert('Failed to add project. Please try again.');
                }
              }}
            />
            <ProjectList 
              projects={projects} 
              onDeleteProject={async (id) => {
                if (window.confirm('Are you sure you want to delete this project?')) {
                  try {
                    await axios.delete(`${import.meta.env.VITE_API_URL}/api/projects/${id}`, {
                      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                    });
                    await fetchProjects();
                  } catch (error) {
                    console.error('Error deleting project:', error);
                    alert('Failed to delete project. Please try again.');
                  }
                }
              }}
            />
          </div>
        )}
      </main>

      {/* Calendar Modal */}
      <CalendarModal 
        isOpen={showCalendarModal} 
        onClose={() => setShowCalendarModal(false)} 
      />
    </div>
  );
};

export default TLDashboard;