import React, { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import api from '../api';

function Recommendation() {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    api.get('/recommendation/getAIRecommendations/1')
      .then(response => {
        // Ensure we have a valid array of recommendations
        if (Array.isArray(response.data)) {
          setRecommendations(response.data);
        } else {
          console.warn('API response is not an array:', response.data);
          setError(true);
          // Create an empty array to avoid mapping errors
          setRecommendations([]);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('There was an error fetching the AI-generated recommendations!', error);
        setError(true);
        setRecommendations([]);
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
          {error && (
            <div className="alert alert-warning">
              Unable to load recommendations from server.
            </div>
          )}
          {recommendations.length === 0 && !error ? (
            <div className="alert alert-info">
              No recommendations available at this time.
            </div>
          ) : (
            recommendations.map((recommendation, index) => (
              <div key={index} className="track-item">
                <span className="track-number">{index + 1}</span>
                <div className="track-info">
                  <div className="track-title">{recommendation.split(' - ')[0] || recommendation}</div>
                  <div className="track-artist">{recommendation.split(' - ')[1] || ''}</div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default Recommendation;
