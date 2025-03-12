import axios from 'axios';

const API_URL = 'https://task-managment-eglk.onrender.com';

// Fetch all tasks
export const fetchTasks = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/tasks`);
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

// Fetch a single task by ID
export const fetchTaskById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/api/tasks/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching task with ID ${id}:`, error);
    throw error;
  }
};

// Create a new task
export const createTask = async (taskData) => {
  try {
    const response = await axios.post(`${API_URL}/api/tasks`, taskData);
    return response.data;
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
};

// Update a task
export const updateTask = async (id, taskData) => {
  try {
    const response = await axios.put(`${API_URL}/api/tasks/${id}`, taskData);
    return response.data;
  } catch (error) {
    console.error(`Error updating task with ID ${id}:`, error);
    throw error;
  }
};

// Delete a task
export const deleteTask = async (id) => {
  try {
    await axios.delete(`${API_URL}/api/tasks/${id}`);
    return true;
  } catch (error) {
    console.error(`Error deleting task with ID ${id}:`, error);
    throw error;
  }
}; 
