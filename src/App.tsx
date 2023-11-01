import React from 'react';
import { ClockContextProvider } from './contexts/ClockContext';
import ClockContainer from './components/ClockContainer';

/**
 * App component is the root component of the application
 */
function App() {
  return (
    <ClockContextProvider>
      <ClockContainer />
    </ClockContextProvider>
  );
};

export default App;