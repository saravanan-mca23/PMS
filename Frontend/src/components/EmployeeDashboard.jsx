import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getAllProjects, updateProject } from "../services/api";
import { FaSignOutAlt, FaPlusCircle, FaClock, FaTasks, FaCalendarAlt, FaUserCircle, FaChevronDown, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const EmployeeDashboard = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [workHours, setWorkHours] = useState("");
  const [status, setStatus] = useState("in-progress");
  const profileRef = useRef(null);
  const calendarRef = useRef(null);
  const modalRef = useRef(null);

  const user = JSON.parse(localStorage.getItem("user")) || {
    name: "Unknown User",
    email: "unknown@example.com",
    role: "Employee"
  };

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      toast.error("Unauthorized. Please log in.");
      navigate("/login");
      return;
    }

    const fetchProjects = async () => {
      try {
        const response = await getAllProjects();
        setProjects(response);
        setLoading(false);
      } catch (error) {
        toast.error("Failed to fetch projects");
        setLoading(false);
      }
    };

    fetchProjects();

    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
      if (modalRef.current && !modalRef.current.contains(event.target) && event.target.id !== "project-card") {
        setSelectedProject(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [navigate, token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const handleStatusUpdate = async () => {
    if (!workHours || isNaN(workHours)) {
      toast.error("Please enter valid work hours");
      return;
    }

    try {
      const updatedProject = {
        ...selectedProject,
        status,
        workDetails: [
          ...(selectedProject.workDetails || []),
          {
            employeeName: user.name,
            hours: Number(workHours),
            date: new Date().toISOString(),
            statusBefore: selectedProject.status,
            statusAfter: status
          }
        ]
      };

      await updateProject(selectedProject._id, updatedProject);
      
      setProjects(projects.map(p => 
        p._id === selectedProject._id ? updatedProject : p
      ));
      
      toast.success("Project updated successfully");
      setSelectedProject(null);
      setWorkHours("");
    } catch (error) {
      toast.error("Failed to update project");
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-100 flex flex-col overflow-hidden">
      {/* Header */}
      <header className="bg-white shadow-sm py-4 px-6 flex-shrink-0">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gray-800">Employee Dashboard</h1>
            <div className="relative" ref={calendarRef}>
              <button 
                onClick={() => setShowCalendar(!showCalendar)}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
              >
                <FaCalendarAlt className="text-lg" />
              </button>
              {showCalendar && (
                <div className="absolute z-20 mt-2 bg-blue-50 shadow-xl rounded-lg p-4 border border-blue-100">
                <Calendar 
                  className="border-0"
                  onClickDay={() => setShowCalendar(false)}
                />
              </div>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative" ref={profileRef}>
              <button 
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                className="flex items-center space-x-2 focus:outline-none group"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="text-left hidden md:block">
                  <p className="text-sm font-medium text-gray-700">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.role}</p>
                </div>
                <FaChevronDown className={`text-gray-400 group-hover:text-gray-600 transition-transform ${showProfileDropdown ? 'transform rotate-180' : ''}`} />
              </button>

              {showProfileDropdown && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl py-1 z-10 border border-gray-200">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-800">{user.name}</p>
                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center transition-colors"
                  >
                    <FaSignOutAlt className="mr-2 text-red-500" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 md:p-6">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto">
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {projects.length > 0 ? (
                projects.map((project) => (
                  <div 
                    key={project._id} 
                    id="project-card"
                    onClick={() => setSelectedProject(project)}
                    className="bg-white rounded-xl shadow hover:shadow-md transition-all cursor-pointer transform hover:-translate-y-1"
                  >
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <h2 className="text-xl font-bold text-gray-800 truncate">{project.name}</h2>
                        <span className={`text-xs px-3 py-1 rounded-full ${
                          project.status === 'completed' ? 'bg-green-100 text-green-800' :
                          project.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {project.status.replace('-', ' ')}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-4 line-clamp-2">{project.description}</p>
                      <div className="flex items-center text-sm text-gray-500">
                        <FaClock className="mr-2 text-gray-400" />
                        <span>Due: {new Date(project.deadline).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full bg-white rounded-xl shadow-md p-8 text-center">
                  <FaTasks className="mx-auto text-4xl text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium text-gray-700">No projects assigned</h3>
                  <p className="text-gray-500 mt-1">You don't have any projects yet</p>
                </div>
              )}
            </div>

            <div className="mt-8 flex justify-center">
              
            </div>
          </div>
        )}
      </main>

      {/* Project Details Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div 
            ref={modalRef}
            className="bg-white rounded-xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-800">{selectedProject.name}</h2>
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <FaTimes />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">{selectedProject.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Deadline</label>
                    <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">
                      {new Date(selectedProject.deadline).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Current Status</label>
                    <p className={`text-sm p-3 rounded-lg capitalize ${
                      selectedProject.status === 'completed' ? 'bg-green-100 text-green-800' :
                      selectedProject.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {selectedProject.status.replace('-', ' ')}
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Update Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Hours Worked Today
                  </label>
                  <input
                    type="number"
                    value={workHours}
                    onChange={(e) => setWorkHours(e.target.value)}
                    placeholder="Enter hours (e.g., 6)"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    min="0"
                    step="0.5"
                  />
                </div>

                {selectedProject.workDetails?.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Work History</label>
                    <div className="bg-gray-50 p-3 rounded-lg max-h-40 overflow-y-auto">
                      {selectedProject.workDetails.map((work, index) => (
                        <div key={index} className="mb-2 pb-2 border-b border-gray-200 last:border-0">
                          <p className="text-sm font-medium">{work.employeeName}</p>
                          <p className="text-xs text-gray-500">
                            {new Date(work.date).toLocaleDateString()} - {work.hours} hours
                          </p>
                          <p className="text-xs">
                            Status: {work.statusBefore.replace('-', ' ')} → {work.statusAfter.replace('-', ' ')}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleStatusUpdate}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Submit Update
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeDashboard;