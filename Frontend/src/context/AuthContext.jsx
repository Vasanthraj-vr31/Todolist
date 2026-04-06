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
    } else {
      localStorage.removeItem('token');
      setUser(null);
      setLoading(false);
    }
  }, [token]);

  const fetchUser = async () => {
    try {
      const res = await api.get('/getuser');
      setUser(res.data.user);
    } catch (err) {
      console.error('Error fetching user', err);
      // Optional: Handle token expiration logic here
      setToken(null);
    } finally {
      setLoading(false);
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

  // Local Task State (as Backend doesn't have Todo models yet)
  const [tasks, setTasks] = useState([
    { id: '1', title: 'Review PR for authentications', tag: 'Engineering', completed: false },
    { id: '2', title: 'Design system updates', tag: 'Design', completed: false },
    { id: '3', title: 'Weekly sync with marketing', tag: 'Meeting', completed: true },
  ]);

  const addTask = (title) => {
    const newTask = {
      id: Date.now().toString(),
      title,
      tag: user?.Department || 'General',
      completed: false
    };
    setTasks([newTask, ...tasks]);
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
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
