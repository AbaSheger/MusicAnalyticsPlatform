import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Recommendation() {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    axios.get('/recommendation/getRecommendations/1')
      .then(response => {
        setRecommendations(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the recommendations!', error);
      });
  }, []);

  return (
    <div>
      <h2>Recommendations</h2>
      <ul>
        {recommendations.map((recommendation, index) => (
          <li key={index}>{recommendation}</li>
        ))}
      </ul>
    </div>
  );
}

export default Recommendation;
