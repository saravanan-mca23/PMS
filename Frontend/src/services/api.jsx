import axios from 'axios';

// Backend server URL
const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`, // Backend URL
});

// API Endpoints
export const registerUser = (userData) => API.post('/employees/register', userData);
export const loginUser = async (credentials) => {
    try {
      const { data } = await API.post('/employees/login', credentials);
      return data;
    } catch (error) {
      console.error("Login failed", error);
      throw error;
    }
  };

// Fetch all projects
export const getAllProjects = async () => {
  try {
    const response = await API.get('/projects');
    return response.data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
};

// Create project
export const createProject = async (projectData) => {
  try {
    const response = await API.post('/projects', projectData);
    return response.data;
  } catch (error) {
    console.error("Error creating project:", error);
    throw error;
  }
};

// Update project
export const updateProject = async (id, updatedData) => {
  try {
    const response = await API.put(`/projects/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Error updating project:", error);
    throw error;
  }
};

// Delete project
export const deleteProject = async (id) => {
  try {
    const response = await API.delete(`/projects/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting project:", error);
    throw error;
  }
};

export const getAllEmployees = async () => {
    const response = await fetch('/api/employees');
    if (!response.ok) {
      throw new Error('Failed to fetch employees');
    }
    return await response.json();
  };

export default {
  // Auth
  registerUser,
  loginUser,
  
  // Projects
  getAllProjects,   
  createProject,
  updateProject,
  deleteProject,

  getAllEmployees
};
