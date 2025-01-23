import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './EditProject.css'; // Import the CSS file

const EditProject = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [status, setStatus] = useState('');
  const [budget, setBudget] = useState('');
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/projects/${id}`);
        console.log(res.data); // Debugging line
    
        // Convert the dates to the correct format
        const startDateFormatted = new Date(res.data.startDate).toISOString().split('T')[0];
        const endDateFormatted = new Date(res.data.endDate).toISOString().split('T')[0];
    
        setName(res.data.name);
        setStartDate(startDateFormatted);
        setEndDate(endDateFormatted);
        setStatus(res.data.status);
        setBudget(res.data.budget);
      } catch (error) {
        console.error('Error fetching project:', error);
      }
    };
    
    
    fetchProject();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const updatedProject = {
        name,
        startDate,
        endDate,
        status,
        budget
      };
      
      await axios.put(`http://localhost:5000/api/projects/${id}`, updatedProject);
      navigate('/projects');
    } catch (error) {
      console.error('Error updating project:', error);
    }
  };

  return (
    <div className="edit-project-container">
      <h1>Edit Project</h1>
      <form onSubmit={handleSubmit} className="edit-project-form">
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label>
          Start Date:
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
        </label>
        <label>
          End Date:
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
        </label>
        <label>
          Status:
          <select value={status} onChange={(e) => setStatus(e.target.value)} required>
            <option value="Not Started">Not Started</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </label>
        <label>
          Budget:
          <input type="number" value={budget} onChange={(e) => setBudget(e.target.value)} required />
        </label>
        <button type="submit">Update Project</button>
      </form>
    </div>
  );
};

export default EditProject;
