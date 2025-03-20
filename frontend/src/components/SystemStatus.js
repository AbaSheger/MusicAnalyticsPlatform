import React, { useState, useEffect } from 'react';
import api from '../api';

function SystemStatus() {
  const [status, setStatus] = useState({
    loading: true,
    apiGateway: 'Unknown',
    eureka: 'Unknown',
    services: {
      recommendation: 'Unknown',
      statistics: 'Unknown',
      userTracking: 'Unknown'
    }
  });

  useEffect(() => {
    const checkStatus = async () => {
      try {
        // Check API Gateway status
        const apiGatewayResponse = await api.get('/actuator/health');
        
        // Try to get services from Eureka
        const servicesResponse = await api.get('/eureka/services');
        
        setStatus({
          loading: false,
          apiGateway: apiGatewayResponse.data.status || 'UP',
          eureka: 'UP',
          services: {
            recommendation: servicesResponse.data.includes('RECOMMENDATION-SERVICE') ? 'UP' : 'DOWN',
            statistics: servicesResponse.data.includes('STATISTICS-SERVICE') ? 'UP' : 'DOWN',
            userTracking: servicesResponse.data.includes('USER-TRACKING-SERVICE') ? 'UP' : 'DOWN'
          }
        });
      } catch (error) {
        console.error('Failed to fetch system status:', error);
        setStatus(prev => ({
          ...prev,
          loading: false,
          apiGateway: error.message.includes('Network Error') ? 'DOWN' : prev.apiGateway,
          eureka: 'DOWN'
        }));
      }
    };

    checkStatus();
    // Check status every 30 seconds
    const interval = setInterval(checkStatus, 30000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="system-status">
      <h2>System Status</h2>
      {status.loading ? (
        <p>Loading system status...</p>
      ) : (
        <div className="status-grid">
          <div className={`status-item ${status.apiGateway === 'UP' ? 'status-up' : 'status-down'}`}>
            <h3>API Gateway</h3>
            <p>{status.apiGateway}</p>
          </div>
          <div className={`status-item ${status.eureka === 'UP' ? 'status-up' : 'status-down'}`}>
            <h3>Eureka Server</h3>
            <p>{status.eureka}</p>
          </div>
          <div className={`status-item ${status.services.recommendation === 'UP' ? 'status-up' : 'status-down'}`}>
            <h3>Recommendation Service</h3>
            <p>{status.services.recommendation}</p>
          </div>
          <div className={`status-item ${status.services.statistics === 'UP' ? 'status-up' : 'status-down'}`}>
            <h3>Statistics Service</h3>
            <p>{status.services.statistics}</p>
          </div>
          <div className={`status-item ${status.services.userTracking === 'UP' ? 'status-up' : 'status-down'}`}>
            <h3>User Tracking Service</h3>
            <p>{status.services.userTracking}</p>
          </div>
        </div>
      )}
      <div className="last-updated">
        <small>Last updated: {new Date().toLocaleTimeString()}</small>
      </div>
    </div>
  );
}

export default SystemStatus;