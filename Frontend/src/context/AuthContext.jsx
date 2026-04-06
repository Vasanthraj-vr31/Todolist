import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);

  // Axios instance using Vite Environment Variable
  const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  });

  // Adding Authorization header to all requests if token exists
  api.interceptors.request.use((config) => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      fetchUser();
      fetchTasks();
    } else {
      localStorage.removeItem('token');
      setUser(null);
      setTasks([]);
      setLoading(false);
    }
  }, [token]);

  const fetchUser = async () => {
    try {
      const res = await api.get('/getuser');
      setUser(res.data.user);
    } catch (err) {
      console.error('Error fetching user', err);
      if (err.response?.status === 401) setToken(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchTasks = async () => {
    try {
      const res = await api.get('/tasks');
      setTasks(res.data.tasks);
    } catch (err) {
      console.error('Error fetching tasks', err);
    }
  };

  const login = async (email, password) => {
    const res = await api.post('/login', { email, password });
    setToken(res.data.token);
    setUser(res.data.user);
    return res.data;
  };

  const register = async (userData) => {
    const res = await api.post('/register', userData);
    return res.data;
  };

  const logout = () => {
    setToken(null);
  };

  const updateUser = async (updates) => {
    const res = await api.patch('/updateuser', updates);
    setUser(res.data.user);
    return res.data;
  };

  // Local Task State updated via API interactions
  const [tasks, setTasks] = useState([]);

  const addTask = async (title) => {
    try {
      const tag = user?.Department || 'General';
      const res = await api.post('/tasks', { title, tag });
      // Add securely to local state ensuring we grab the Mongo _id mapping mapped to `id` normally if required, but tasks uses standard `_id` so we map it.
      setTasks([res.data.task, ...tasks]);
    } catch (err) {
      console.error("Failed to add task", err);
    }
  };

  const toggleTask = async (id) => {
    // Optimistic UI toggle
    const taskToToggle = tasks.find(t => t._id === id || t.id === id);
    if (!taskToToggle) return;
    
    const newStatus = taskToToggle.status === 'completed' ? 'pending' : 'completed';
    
    // Update local state instantly
    setTasks(tasks.map(task => 
      (task._id === id || task.id === id) ? { ...task, status: newStatus, completed: newStatus === 'completed' } : task
    ));

    try {
      await api.put(`/tasks/${taskToToggle._id || taskToToggle.id}`, { status: newStatus });
    } catch (err) {
      console.error("Failed to toggle task", err);
      // Revert upon failure
      setTasks(tasks.map(task => 
        (task._id === id || task.id === id) ? { ...task, status: taskToToggle.status, completed: taskToToggle.status === 'completed' } : task
      ));
    }
  };

  const deleteTask = async (id) => {
    // Extract ID (handling our schema differences briefly just in case)
    const exactId = id;
    
    // Optimistic delete
    setTasks(tasks.filter(task => task._id !== exactId && task.id !== exactId));
    
    try {
      await api.delete(`/tasks/${exactId}`);
    } catch (err) {
      console.error("Failed to delete task", err);
      // Need to re-trigger a fetch ideally if optimistic delete failed
      fetchTasks();
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, token, loading, login, register, logout, updateUser, api,
      tasks, addTask, toggleTask, deleteTask 
    }}>
      {children}
    </AuthContext.Provider>
  );
};
