import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Recommendation from './components/Recommendation';
import Statistics from './components/Statistics';
import UserTracking from './components/UserTracking';
import TrackingHistory from './components/TrackingHistory';

function NavLink({ to, children }) {
  const location = useLocation();
  const isActive = location.pathname === to || (to === '/recommendation' && location.pathname === '/');
  return (
    <li>
      <Link to={to} className={isActive ? 'active' : ''}>
        {to === '/recommendation' && (
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M12.5 3.247a1 1 0 0 0-1 0L4 7.577V20h4.5v-6a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v6H20V7.577l-7.5-4.33zm-2-1.732a3 3 0 0 1 3 0l7.5 4.33a2 2 0 0 1 1 1.732V21a1 1 0 0 1-1 1h-6.5a1 1 0 0 1-1-1v-6h-3v6a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.577a2 2 0 0 1 1-1.732l7.5-4.33z" />
          </svg>
        )}
        {to === '/statistics' && (
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M6 3a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3 3 3 0 0 1-3-3V6a3 3 0 0 1 3-3zm0 2a1 1 0 0 0-1 1v12a1 1 0 1 0 2 0V6a1 1 0 0 0-1-1zm7-2a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3 3 3 0 0 1-3-3V6a3 3 0 0 1 3-3zm0 2a1 1 0 0 0-1 1v12a1 1 0 1 0 2 0V6a1 1 0 0 0-1-1zm7-2a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3 3 3 0 0 1-3-3V6a3 3 0 0 1 3-3zm0 2a1 1 0 0 0-1 1v12a1 1 0 1 0 2 0V6a1 1 0 0 0-1-1z" />
          </svg>
        )}
        {to === '/user-tracking' && (
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M11 2v20c-5.5-5-11-12.5-11-18C0 1.8 1.8 0 4 0c2.2 0 4 1.8 4 4h2c0-2.2 1.8-4 4-4 2.2 0 4 1.8 4 4 0 5.5-5.5 13-7 15zM6 4c0-1.1-.9-2-2-2s-2 .9-2 2c0 4 3.5 9.5 7 13v-11H6zm13-2c-1.1 0-2 .9-2 2h-3v11c3.5-3.5 7-9 7-13 0-1.1-.9-2-2-2z" />
          </svg>
        )}
        {to === '/history' && (
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 16c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7zm1-7.41V8c0-.55-.45-1-1-1s-1 .45-1 1v4c0 .28.11.53.29.71l3 3c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13 11.59z" />
          </svg>
        )}
        <span>{children}</span>
      </Link>
    </li>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <div className="logo">
            <h1>Music Analytics</h1>
          </div>
          <ul>
            <NavLink to="/recommendation">Home</NavLink>
            <NavLink to="/statistics">Top Tracks</NavLink>
            <NavLink to="/user-tracking">Add Track</NavLink>
            <NavLink to="/history">History</NavLink>
          </ul>
        </nav>
        <main>
          <Routes>
            <Route path="/recommendation" element={<Recommendation />} />
            <Route path="/statistics" element={<Statistics />} />
            <Route path="/user-tracking" element={<UserTracking />} />
            <Route path="/history" element={<TrackingHistory />} />
            <Route path="/" element={<Recommendation />} />
          </Routes>
        </main>
        <footer>
          <p>&copy; 2025 Music Analytics Platform</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
