import React, { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import api from '../api';

function Statistics() {
  const [topTracks, setTopTracks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/statistics/topTracks')
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
      <h2>Your Top Tracks</h2>
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <div className="tracks-container">
          {topTracks.map((track, index) => (
            <div key={index} className="track-item">
              <span className="track-number">{index + 1}</span>
              <div className="track-info">
                <div className="track-title">{track.split(' - ')[0]}</div>
                <div className="track-artist">{track.split(' - ')[1]}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Statistics;
