import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import './Dashboard.css'; // Import the external CSS file

const Dashboard = ({ user, onLogout }) => {
  return (
    <div className="dashboard-container">
      {/* Navbar */}
      <header className="navbar">
        <h1 className="logo">Welcome, {user?.displayName?.split(' ')[0] || 'User'}!</h1>
        <nav>
          <ul className="nav-links">
            <li className="nav-item">
              <NavLink 
                to="/projects" 
                className={({ isActive }) => (isActive ? 'active-link' : 'link')}
              >
                Projects
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                to="/tasks" 
                className={({ isActive }) => (isActive ? 'active-link' : 'link')}
              >
                Tasks
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                to="/employees" 
                className={({ isActive }) => (isActive ? 'active-link' : 'link')}
              >
                Employees
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                to="/alerts" 
                className={({ isActive }) => (isActive ? 'active-link' : 'link')}
              >
                Alerts
              </NavLink>
            </li>
          </ul>
        </nav>
        <button className="logout-btn" onClick={onLogout}>
          Logout
        </button>
      </header>

      {/* Nested Routes */}
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
