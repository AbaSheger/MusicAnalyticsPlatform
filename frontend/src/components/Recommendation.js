import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Spinner } from 'react-bootstrap';

function Recommendation() {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/recommendation/getRecommendations/1')
      .then(response => {
        setRecommendations(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('There was an error fetching the recommendations!', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="recommendation">
      <h2>Recommendations</h2>
      {loading ? (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      ) : (
        <ul>
          {recommendations.map((recommendation, index) => (
            <li key={index}>{recommendation}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Recommendation;
