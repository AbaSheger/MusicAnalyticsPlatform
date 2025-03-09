import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';
import api from '../api';

function UserTracking() {
  const [playback, setPlayback] = useState('');
  const [search, setSearch] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const logPlayback = () => {
    if (!playback.trim()) return;
    api.post('/user-tracking/logPlayback', { playback })
      .then(response => {
        console.log('Playback logged:', response.data);
        setSuccessMessage('Playback logged successfully!');
        setPlayback('');
        setTimeout(() => setSuccessMessage(''), 3000);
      })
      .catch(error => {
        console.error('There was an error logging the playback!', error);
      });
  };

  const logSearch = () => {
    if (!search.trim()) return;
    api.post('/user-tracking/logSearch', { search })
      .then(response => {
        console.log('Search logged:', response.data);
        setSuccessMessage('Search logged successfully!');
        setSearch('');
        setTimeout(() => setSuccessMessage(''), 3000);
      })
      .catch(error => {
        console.error('There was an error logging the search!', error);
      });
  };

  const handleKeyPress = (e, action) => {
    if (e.key === 'Enter') {
      action();
    }
  };

  return (
    <div className="user-tracking">
      <h2>User Tracking</h2>
      {successMessage && (
        <Alert variant="success" className="mb-4">
          {successMessage}
        </Alert>
      )}
      
      <div className="tracking-input-group">
        <label>Log Playback</label>
        <div className="input-with-button">
          <input
            type="text"
            value={playback}
            onChange={(e) => setPlayback(e.target.value)}
            onKeyPress={(e) => handleKeyPress(e, logPlayback)}
            placeholder="Enter song name or playback info"
          />
          <button onClick={logPlayback}>Log Playback</button>
        </div>
      </div>

      <div className="tracking-input-group">
        <label>Log Search</label>
        <div className="input-with-button">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyPress={(e) => handleKeyPress(e, logSearch)}
            placeholder="Enter search query"
          />
          <button onClick={logSearch}>Log Search</button>
        </div>
      </div>
    </div>
  );
}

export default UserTracking;
