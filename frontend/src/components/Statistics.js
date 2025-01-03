import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Statistics() {
  const [topTracks, setTopTracks] = useState([]);

  useEffect(() => {
    axios.get('/statistics/topTracks')
      .then(response => {
        setTopTracks(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the top tracks!', error);
      });
  }, []);

  return (
    <div>
      <h2>Top Tracks</h2>
      <ul>
        {topTracks.map((track, index) => (
          <li key={index}>{track}</li>
        ))}
      </ul>
    </div>
  );
}

export default Statistics;
