import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Recommendation from './components/Recommendation';
import Statistics from './components/Statistics';

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
          </ul>
        </nav>
        <main>
          <Routes>
            <Route path="/recommendation" element={<Recommendation />} />
            <Route path="/statistics" element={<Statistics />} />
          </Routes>
        </main>
        <footer>
          <p>&copy; 2023 Music Analytics Platform. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
