import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './EditEmployee.css'; // Import the CSS file

const EditEmployee = () => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [assignedTasks, setAssignedTasks] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  // Fetch employee details and available tasks
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const employeeRes = await axios.get(`http://localhost:5000/api/employees/${id}`);
        const tasksRes = await axios.get('http://localhost:5000/api/tasks');
        
        setName(employeeRes.data.name);
        setRole(employeeRes.data.role);
        setAssignedTasks(employeeRes.data.assignedTasks);
        setTasks(tasksRes.data);
      } catch (err) {
        console.error('Error fetching employee or tasks:', err);
        setError('Failed to fetch employee data.');
      }
    };

    fetchEmployee();
  }, [id]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updatedEmployee = {
        name,
        role,
        assignedTasks,
      };

      await axios.put(`http://localhost:5000/api/employees/${id}`, updatedEmployee);
      navigate('/employees');
    } catch (err) {
      console.error('Error updating employee:', err);
      setError('Failed to update employee data.');
    }
  };

  return (
    <div className="edit-employee-container">
      <h1>Edit Employee</h1>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="edit-employee-form">
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Role:
          <select value={role} onChange={(e) => setRole(e.target.value)} required>
            <option value="Manager">Manager</option>
            <option value="Engineer">Engineer</option>
            <option value="Worker">Worker</option>
          </select>
        </label>
        <label>
          Assigned Tasks:
          <select
            multiple
            value={assignedTasks}
            onChange={(e) =>
              setAssignedTasks(Array.from(e.target.selectedOptions, (option) => option.value))
            }
          >
            {tasks.map((task) => (
              <option key={task._id} value={task._id}>
                {task.name}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Update Employee</button>
      </form>
    </div>
  );
};

export default EditEmployee;
