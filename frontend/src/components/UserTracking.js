import React, { useState } from 'react';
import axios from 'axios';

function UserTracking() {
  const [playback, setPlayback] = useState('');
  const [search, setSearch] = useState('');

  const logPlayback = () => {
    axios.post('/user-tracking/logPlayback', { playback })
      .then(response => {
        console.log('Playback logged:', response.data);
      })
      .catch(error => {
        console.error('There was an error logging the playback!', error);
      });
  };

  const logSearch = () => {
    axios.post('/user-tracking/logSearch', { search })
      .then(response => {
        console.log('Search logged:', response.data);
      })
      .catch(error => {
        console.error('There was an error logging the search!', error);
      });
  };

  return (
    <div>
      <h2>User Tracking</h2>
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
