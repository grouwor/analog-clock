import { useEffect, useContext } from 'react';
import ClockContext from '../contexts/ClockContext';

/**
 * Custom hook that updates the current time every 500 milliseconds
 */
const useCurrentTime = () => {
  const clockContext = useContext(ClockContext);

  useEffect(() => {
    /**
     * Updates the clock context with the current time
     */
    const handleTick = () => {
      clockContext?.handleTick(new Date());
    };

    const interval = setInterval(handleTick, 500);

    return () => {
      clearInterval(interval);
    };
  }, [clockContext]);
};

export default useCurrentTime;