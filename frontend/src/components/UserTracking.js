import React, { useState } from 'react';
import axios from 'axios';
import { Alert } from 'react-bootstrap';

function UserTracking() {
  const [playback, setPlayback] = useState('');
  const [search, setSearch] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const logPlayback = () => {
    axios.post('/user-tracking/logPlayback', { playback })
      .then(response => {
        console.log('Playback logged:', response.data);
        setSuccessMessage('Playback logged successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
      })
      .catch(error => {
        console.error('There was an error logging the playback!', error);
      });
  };

  const logSearch = () => {
    axios.post('/user-tracking/logSearch', { search })
      .then(response => {
        console.log('Search logged:', response.data);
        setSuccessMessage('Search logged successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
      })
      .catch(error => {
        console.error('There was an error logging the search!', error);
      });
  };

  return (
    <div className="user-tracking">
      <h2>User Tracking</h2>
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      <div>
        <input
          type="text"
          value={playback}
          onChange={(e) => setPlayback(e.target.value)}
          placeholder="Log Playback"
        />
        <button onClick={logPlayback}>Log Playback</button>
      </div>
      <div>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Log Search"
        />
        <button onClick={logSearch}>Log Search</button>
      </div>
    </div>
  );
}

export default UserTracking;
