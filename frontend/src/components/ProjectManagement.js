import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './ProjectManagement.css'; // Import the CSS file

const ProjectManagement = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/projects');
        setProjects(res.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/projects/${id}`);
      setProjects(projects.filter(project => project._id !== id));
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  return (
    <div className="project-management-container">
      <div className="project-management-header">
        <h1>Project Management</h1>
        <Link to="/create-project" className="create-project-link">
          Create New Project
        </Link>
      </div>

      <table className="project-table">
        <thead>
          <tr>
            <th>Project Name</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Status</th>
            <th>Budget</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map(project => (
            <tr key={project._id}>
              <td>{project.name}</td>
              <td>{new Date(project.startDate).toLocaleDateString()}</td>
              <td>{new Date(project.endDate).toLocaleDateString()}</td>
              <td>
                <span className={`status-tag ${project.status.toLowerCase().replace(' ', '-')}`}>
                  {project.status}
                </span>
              </td>
              <td>${project.budget}</td>
              <td>
                <Link to={`/edit-project/${project._id}`} className="edit-link">Edit</Link>
                <button className="delete-button" onClick={() => handleDelete(project._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectManagement;
