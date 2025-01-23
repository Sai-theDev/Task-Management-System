import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './EditTask.css'; // Import the CSS file

const EditTask = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');
  const [priority, setPriority] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [projectId, setProjectId] = useState('');
  const [projects, setProjects] = useState([]);
  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/tasks/${id}`);
        
        // Format the dates to YYYY-MM-DD
        const startDateFormatted = new Date(res.data.startDate).toISOString().split('T')[0];
        const endDateFormatted = new Date(res.data.endDate).toISOString().split('T')[0];

        setName(res.data.name);
        setDescription(res.data.description);
        setStatus(res.data.status);
        setPriority(res.data.priority);
        setStartDate(startDateFormatted);
        setEndDate(endDateFormatted);
        setProjectId(res.data.projectId);
      } catch (error) {
        console.error('Error fetching task:', error);
      }
    };

    const fetchProjects = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/projects');
        setProjects(res.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchTask();
    fetchProjects();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const updatedTask = {
        name,
        description,
        status,
        priority,
        startDate,
        endDate,
        projectId
      };
      
      await axios.put(`http://localhost:5000/api/tasks/${id}`, updatedTask);
      navigate('/tasks');
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
    <div className="edit-task-container">
      <h1>Edit Task</h1>
      <form onSubmit={handleSubmit} className="edit-task-form">
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
        <label>
          Description:
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
        <label>
          Status:
          <select value={status} onChange={(e) => setStatus(e.target.value)} required>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </label>
        <label>
          Priority:
          <select value={priority} onChange={(e) => setPriority(e.target.value)} required>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
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
          Project:
          <select value={projectId} onChange={(e) => setProjectId(e.target.value)} required>
            {projects.map(project => (
              <option key={project._id} value={project._id}>{project.name}</option>
            ))}
          </select>
        </label>
        <button type="submit">Update Task</button>
      </form>
    </div>
  );
};

export default EditTask;
