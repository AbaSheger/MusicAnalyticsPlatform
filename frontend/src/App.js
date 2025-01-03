import React from 'react';
import Recommendation from './components/Recommendation';
import Statistics from './components/Statistics';
import UserTracking from './components/UserTracking';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Music Analytics Platform</h1>
      </header>
      <main>
        <Recommendation />
        <Statistics />
        <UserTracking />
      </main>
    </div>
  );
}

export default App;
