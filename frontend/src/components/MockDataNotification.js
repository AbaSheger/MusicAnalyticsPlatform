import React, { useState, useEffect } from 'react';
import { onMockDataStateChange } from '../api';

function MockDataNotification() {
  const [isMockData, setIsMockData] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Subscribe to mock data state changes
    const unsubscribe = onMockDataStateChange((mockDataActive) => {
      setIsMockData(mockDataActive);
      setIsVisible(mockDataActive);
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="mock-data-notification">
      <div className="mock-data-content">
        <div className="mock-data-header">
          <h4>Demo Mode Active</h4>
          <button className="close-button" onClick={handleClose}>×</button>
        </div>
        <div className="mock-data-body">
          <p>You are currently viewing demo data while the backend services are starting up.</p>
          <p>This allows you to preview the application's functionality immediately.</p>
          <p className="mock-data-note">The application will automatically switch to real data once services are available.</p>
        </div>
      </div>
    </div>
  );
}

export default MockDataNotification;