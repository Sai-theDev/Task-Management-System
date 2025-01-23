import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CreateProject.css'; // Import the CSS file

const CreateProject = () => {
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [status, setStatus] = useState('');
  const [budget, setBudget] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newProject = {
        name,
        startDate,
        endDate,
        status,
        budget,
      };

      await axios.post('http://localhost:5000/api/projects', newProject);
      navigate('/projects');
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

  return (
    <div className="form-container">
      <h1>Create New Project</h1>
      <form onSubmit={handleSubmit} className="project-form">
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Enter project name"
          />
        </label>
        <label>
          Start Date:
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </label>
        <label>
          End Date:
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </label>
        <label>
          Status:
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            <option value="">Select Status</option>
            <option value="Not Started">Not Started</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </label>
        <label>
          Budget:
          <input
            type="number"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            required
            placeholder="Enter project budget"
          />
        </label>
        <button type="submit" className="submit-button">
          Create Project
        </button>
      </form>
    </div>
  );
};

export default CreateProject;
