import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Recommendation from './components/Recommendation';
import Statistics from './components/Statistics';
import UserTracking from './components/UserTracking';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Music Analytics Platform</h1>
        </header>
        <nav>
          <ul>
            <li><Link to="/recommendation">Recommendation</Link></li>
            <li><Link to="/statistics">Statistics</Link></li>
            <li><Link to="/user-tracking">User Tracking</Link></li>
          </ul>
        </nav>
        <main>
          <Route path="/recommendation" component={Recommendation} />
          <Route path="/statistics" component={Statistics} />
          <Route path="/user-tracking" component={UserTracking} />
        </main>
        <footer>
          <p>&copy; 2023 Music Analytics Platform. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
