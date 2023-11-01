import React, { useContext } from 'react';
import Clock from './Clock';
import ClockContext from '../contexts/ClockContext';
import useCurrentTime from '../hooks/useCurrentTime';

/**
 * ClockContainer component displays the Clock component with the current time
 */
const ClockContainer: React.FC = () => {
  const clockContext = useContext(ClockContext);

  // Update the current time using the useCurrentTime custom hook
  useCurrentTime();

  return (
    <Clock
      hour={clockContext.hours}
      minute={clockContext.minutes}
      second={clockContext.seconds}
    />
  );
};

export default ClockContainer;