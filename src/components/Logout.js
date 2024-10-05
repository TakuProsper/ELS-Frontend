import React from 'react';
import axios from 'axios';

function Logout() {
  const handleLogout = () => {
    const refreshToken = localStorage.getItem('refresh_token'); // Get the refresh token from local storage
    if (!refreshToken) {
      console.error('Refresh token not found in local storage');
      return;
    }
    axios.post('http://localhost:8000/api/logout/', { refresh_token: refreshToken }) // Send the refresh token in the request body
      .then(response => {
        // Remove token from local storage
        localStorage.removeItem('token');
        localStorage.removeItem('refresh_token'); // Remove the refresh token as well
        // Redirect to login page
        window.location.href = '/Login';
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div className='Logout'>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Logout;