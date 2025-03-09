import React, { useState, useEffect } from 'react';
import { onWakeUpStateChange } from '../api';

function WakeUpNotification() {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [dots, setDots] = useState('.');

  useEffect(() => {
    // Subscribe to wake-up state changes
    const unsubscribe = onWakeUpStateChange(state => {
      setIsVisible(state);
      if (state) {
        // Reset progress when newly showing
        setProgress(0);
      }
    });

    // Cleanup
    return unsubscribe;
  }, []);

  // Progress bar animation
  useEffect(() => {
    let progressInterval;
    
    if (isVisible) {
      progressInterval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + 0.5;
          return newProgress > 100 ? 100 : newProgress;
        });
      }, 150);
    }
    
    return () => {
      if (progressInterval) clearInterval(progressInterval);
    };
  }, [isVisible]);

  // Animated dots
  useEffect(() => {
    let dotsInterval;
    
    if (isVisible) {
      dotsInterval = setInterval(() => {
        setDots(prev => {
          if (prev.length >= 3) return '.';
          return prev + '.';
        });
      }, 500);
    }
    
    return () => {
      if (dotsInterval) clearInterval(dotsInterval);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="wake-up-notification">
      <div className="wake-up-content">
        <h3>Services are waking up{dots}</h3>
        <p>Free cloud services go to sleep when inactive. Please wait while we wake them up.</p>
        <div className="progress-container">
          <div 
            className="progress-bar" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="wake-up-tip">This typically takes 30-60 seconds</p>
      </div>
    </div>
  );
}

export default WakeUpNotification;