import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Spinner } from 'react-bootstrap';

function Statistics() {
  const [topTracks, setTopTracks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/statistics/topTracks')
      .then(response => {
        setTopTracks(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('There was an error fetching the top tracks!', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="statistics">
      <h2>Top Tracks</h2>
      {loading ? (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      ) : (
        <ul>
          {topTracks.map((track, index) => (
            <li key={index}>{track}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Statistics;
