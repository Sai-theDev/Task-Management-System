import React from 'react';

const Login = () => {
  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:5000/auth/google'; // Redirect to backend
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Welcome to Task Management</h1>
        <p style={styles.subtitle}>Efficiently manage your projects and tasks</p>
        <button onClick={handleGoogleLogin} style={styles.loginButton}>
          Login with Google
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f4f4f9', // Light background color
    fontFamily: 'Arial, sans-serif',
  },
  card: {
    backgroundColor: 'white', // Solid white background for the card
    padding: '40px',
    borderRadius: '8px',
    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)', // Clean shadow for the card
    textAlign: 'center',
    width: '350px',
  },
  title: {
    fontSize: '28px',
    fontWeight: '700',
    marginBottom: '10px',
    color: '#333',
  },
  subtitle: {
    fontSize: '16px',
    color: '#555',
    marginBottom: '30px',
  },
  loginButton: {
    backgroundColor: '#4285F4',
    color: 'white',
    border: 'none',
    borderRadius: '30px',
    padding: '12px 24px',
    fontSize: '18px',
    cursor: 'pointer',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
};

export default Login;
