import React from 'react';
import { ClockContextProvider } from './contexts/ClockContext';
import ClockContainer from './components/ClockContainer';
import './App.css';
/**
 * App component is the root component of the application
 */
function App() {
  return (
    <div className="container">
      <h1>Analog Clock</h1>
      <ClockContextProvider>
        <ClockContainer />
      </ClockContextProvider>
    </div>
  );
};

export default App;