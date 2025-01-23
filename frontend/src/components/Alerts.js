import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Alerts.css'; // Import the CSS file

const Alerts = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/alerts');
        setAlerts(res.data);
      } catch (error) {
        console.error('Error fetching alerts:', error);
      }
    };

    fetchAlerts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/alerts/${id}`);
      setAlerts(alerts.filter(alert => alert._id !== id));
    } catch (error) {
      console.error('Error deleting alert:', error);
    }
  };

  const handleRead = async (id) => {
    try {
      const alert = alerts.find(a => a._id === id);
      await axios.put(`http://localhost:5000/api/alerts/${id}`, { isRead: true });
      setAlerts(alerts.map(a => a._id === id ? { ...a, isRead: true } : a));
    } catch (error) {
      console.error('Error marking alert as read:', error);
    }
  };

  return (
    <div className="alerts-container">
      <h1>Alerts</h1>
      <ul className="alerts-list">
        {alerts.map(alert => (
          <li key={alert._id}>
            <span className={`alert-text ${alert.isRead ? 'read' : ''}`}>
              {alert.message} - {alert.isRead ? 'Read' : 'Unread'}
            </span>
            {!alert.isRead && (
              <button
                className="mark-read-button"
                onClick={() => handleRead(alert._id)}
              >
                Mark as Read
              </button>
            )}
            <button
              className="delete-button"
              onClick={() => handleDelete(alert._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Alerts;
