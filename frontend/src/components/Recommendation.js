import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Spinner } from 'react-bootstrap';

function Recommendation() {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/recommendation/getAIRecommendations/1')
      .then(response => {
        setRecommendations(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('There was an error fetching the AI-generated recommendations!', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="recommendation">
      <h2>Recommended For You</h2>
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <div className="tracks-container">
          {recommendations.map((recommendation, index) => (
            <div key={index} className="track-item">
              <span className="track-number">{index + 1}</span>
              <div className="track-info">
                <div className="track-title">{recommendation.split(' - ')[0]}</div>
                <div className="track-artist">{recommendation.split(' - ')[1]}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Recommendation;
