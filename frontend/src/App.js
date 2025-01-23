import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import ProjectManagement from './components/ProjectManagement';
import TaskManagement from './components/TaskManagement';
import EmployeeManagement from './components/EmployeeManagement';
import Alerts from './components/Alerts';
import CreateProject from './components/CreateProject';
import CreateTask from './components/CreateTask';
import CreateEmployee from './components/CreateEmployee';
import EditProject from './components/EditProject';
import EditTask from './components/EditTask';
import EditEmployee from './components/EditEmployee';
import Login from './components/Login';

const App = () => {
  const [user, setUser] = useState(null);

  // Fetch the current user from the backend
  useEffect(() => {
    fetch('http://localhost:5000/auth/current-user', { credentials: 'include' })
      .then(res => {
        if (res.ok) return res.json();
        throw new Error('Not authenticated');
      })
      .then(userData => {
        setUser(userData);
        console.log(userData.displayName); // Log the user data after it has been set
      })
      .catch(() => setUser(null));
  }, []);

  const handleLogout = () => {
    fetch('http://localhost:5000/auth/logout', { credentials: 'include' })
      .then((res) => {
        if (res.ok) {
          window.location.href = '/login'; // Manually redirect after logout
        } else {
          throw new Error('Logout failed');
        }
      })
      .catch((err) => {
        console.error(err);
        alert('Failed to log out');
      });
  };
  

  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={user ? <Navigate to="/" replace /> : <Login />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={user ? <Dashboard user={user} onLogout={handleLogout} /> : <Navigate to="/login" replace />}
        >
          {/* Nested Routes */}
          <Route path="projects" element={<ProjectManagement />} />
          <Route path="tasks" element={<TaskManagement />} />
          <Route path="employees" element={<EmployeeManagement />} />
          <Route path="alerts" element={<Alerts />} />
          <Route path="create-project" element={<CreateProject />} />
          <Route path="create-task" element={<CreateTask />} />
          <Route path="create-employee" element={<CreateEmployee />} />
          <Route path="edit-project/:id" element={<EditProject />} />
          <Route path="edit-task/:id" element={<EditTask />} />
          <Route path="edit-employee/:id" element={<EditEmployee />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
