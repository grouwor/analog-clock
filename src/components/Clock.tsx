import React, {
  useState,
  useEffect
} from 'react';
import useCurrentTime from '../hooks/useCurrentTime';

/**
 * Props for the Clock component
 */
interface ClockProps {
  hours: number;
  minutes: number;
  seconds: number;
}

/**
 * Clock component displays the time with hour, minute, and second hands
 */
const Clock: React.FC<ClockProps> = ({ hours, minutes, seconds }) => {
  // State to manage tooltip position and visibility
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [showTooltip, setShowTooltip] = useState(false);

  // Event handler for mouse movement
  const handleMouseMove = (event: MouseEvent) => {
    setTooltipPosition({ x: event.clientX, y: event.clientY });
  };

  // Event handler for mouse enter
  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  // Event handler for mouse leave
  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  // Add event listeners when component mounts
  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);

    // Remove event listeners when component unmounts
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  /**
   * Calculates the rotation angle for the hour hand
   * @param hour - The hour value
   * @param minute - The minute value
   * @returns The rotation angle in degrees
   */
  const calculateHourRotation = (hours: number, minutes: number): number => {
    const hourRotation = (hours % 12) * 30 + minutes * 0.5;
    return hourRotation;
  };

  /**
   * Calculates the rotation angle for the minute hand
   * @param minute - The minute value
   * @param second - The second value
   * @returns The rotation angle in degrees
   */
  const calculateMinuteRotation = (minutes: number, second: number): number => {
    const minuteRotation = minutes * 6 + second * 0.1;
    return minuteRotation;
  };

  /**
   * Calculates the rotation angle for the second hand
   * @param second - The second value
   * @returns The rotation angle in degrees
   */
  const calculateSecondRotation = (seconds: number): number => {
    const secondRotation = seconds * 6;
    return secondRotation;
  };

  const hourRotation = calculateHourRotation(hours, minutes);
  const minuteRotation = calculateMinuteRotation(minutes, seconds);
  const secondRotation = calculateSecondRotation(seconds);

  return (
    <div className="analog-clock">
      {/* Render tooltip if showTooltip is true */}
      {showTooltip && (
        <div
          className="tooltip"
          style={{ top: tooltipPosition.y, left: tooltipPosition.x }}
        >
          {`${hours}:${minutes}:${seconds}`}
        </div>
      )}
      <Hand rotation={hourRotation} type="hour" />
      <Hand rotation={minuteRotation} type="minute" />
      <Hand rotation={secondRotation} type="second" />
    </div>
  );
};

/**
 * Hand component represents a clock hand
 */
const Hand: React.FC<{ rotation: number; type: string }> = ({
  rotation,
  type,
}) => {
  return <div className={`hand ${type}`} style={{ transform: `rotate(${rotation}deg)` }} />;
};

export default Clock;