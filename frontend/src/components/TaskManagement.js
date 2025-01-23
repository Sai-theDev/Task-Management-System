import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './TaskManagement.css'; 

const TaskManagement = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/tasks');
        setTasks(res.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="project-management-container">
      <div className="project-management-header">
        <h1>Task Management</h1>
        <Link to="/create-task" className="create-project-link">
          Create New Task
        </Link>
      </div>
      <table className="project-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task._id}>
              <td>{task.name}</td>
              <td>{task.description || 'N/A'}</td>
              <td>
                <span
                  className={`status-tag ${
                    task.status.toLowerCase().replace(/\s+/g, '-')
                  }`}
                >
                  {task.status}
                </span>
              </td>
              <td>{task.priority}</td>
              <td>{new Date(task.startDate).toLocaleDateString()}</td>
              <td>{new Date(task.endDate).toLocaleDateString()}</td>
              <td>
                <Link to={`/edit-task/${task._id}`} className="edit-link">
                  Edit
                </Link>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(task._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskManagement;
