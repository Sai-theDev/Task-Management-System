import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CreateEmployee.css'; 

const CreateEmployee = () => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const newEmployee = {
        name,
        role,
      };
      
      await axios.post('http://localhost:5000/api/employees', newEmployee);
      navigate('/employees');
    } catch (error) {
      console.error('Error creating employee:', error);
    }
  };

  return (
    <div className="form-container">
      <h1>Create New Employee</h1>
      <form onSubmit={handleSubmit} className="employee-form">
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Enter employee name"
          />
        </label>
        <label>
          Role:
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="">Select Role</option>
            <option value="Manager">Manager</option>
            <option value="Engineer">Engineer</option>
            <option value="Worker">Worker</option>
          </select>
        </label>
        <button type="submit" className="submit-button">
          Create Employee
        </button>
      </form>
    </div>
  );
};

export default CreateEmployee;
