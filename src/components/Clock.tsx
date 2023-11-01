import React, {
  useState,
  useEffect,
  useRef
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
  const containerRef = useRef<HTMLDivElement>(null);

  // Event handler for mouse movement
  const handleMouseMove = (event: MouseEvent) => {
    setTooltipPosition({ x: event.clientX - containerRef.current!.offsetLeft, y: event.clientY - containerRef.current!.offsetTop - 20 });
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
    containerRef.current!.addEventListener('mouseenter', handleMouseEnter);
    containerRef.current!.addEventListener('mousemove', handleMouseMove);
    containerRef.current!.addEventListener('mouseleave', handleMouseLeave);

    // Remove event listeners when component unmounts
    return () => {
      containerRef.current!.removeEventListener('mouseenter', handleMouseEnter);
      containerRef.current!.removeEventListener('mousemove', handleMouseMove);
      containerRef.current!.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  /**
   * Calculates the rotation angle for the hour hand
   * @param hours - The hour value
   * @param minutes - The minute value
   * @returns The rotation angle in degrees
   */
  const calculateHourRotation = (hours: number, minutes: number): number => {
    const hourRotation = 180 + (hours % 12) * 30 + minutes * 0.5;
    return hourRotation;
  };

  /**
   * Calculates the rotation angle for the minute hand
   * @param minutes - The minute value
   * @param seconds - The second value
   * @returns The rotation angle in degrees
   */
  const calculateMinuteRotation = (minutes: number, second: number): number => {
    const minuteRotation = 180 + minutes * 6 + second * 0.1;
    return minuteRotation;
  };

  /**
   * Calculates the rotation angle for the second hand
   * @param seconds - The second value
   * @returns The rotation angle in degrees
   */
  const calculateSecondRotation = (seconds: number): number => {
    const secondRotation = 180 + seconds * 6;
    return secondRotation;
  };

  /**
   * Renders the time sectors for the clock
   * @returns An array of time sector elements
   */
  const renderTimeSectors = () => {
    // Create an array to store the time sector elements
    const sectors = [];

    // Iterate over each minute (60 total) to create a time sector
    for (let i = 0; i < 60; i++) {
      // Create a <div> element representing a time sector
      // Set a unique key for each sector and apply a rotation transform
      sectors.push(
        <div
          key={i}
          className="time-sector"
          style={{ transform: `rotate(${180 + i * 6}deg)` }}
        >
          <span className="time-sector-icon"></span>
        </div>
      );
    }

    // Return the array of time sector elements
    return sectors;
  };

  // Calculate the rotation angles for the hour, minute, and second hands
  const hourRotation = calculateHourRotation(hours, minutes);
  const minuteRotation = calculateMinuteRotation(minutes, seconds);
  const secondRotation = calculateSecondRotation(seconds);

  // Convert the hour, minute, and second values to strings with leading zeros
  const h = String(hours).padStart(2, '0');
  const m = String(minutes).padStart(2, '0');
  const s = String(seconds).padStart(2, '0');

  // Format the time in the "00:00:00" format
  const formattedTime = `${h}:${m}:${s}`;
  return (
    <div className="analog-clock" ref={containerRef}>
      {/* Render the time sectors */}
      <div className="time-sectors">{renderTimeSectors()}</div>
      {/* Render tooltip if showTooltip is true */}
      {showTooltip && (
        <div
          className="tooltip"
          style={{ top: tooltipPosition.y, left: tooltipPosition.x }}
        >
          {formattedTime}
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