import React from 'react';
import useCurrentTime from '../hooks/useCurrentTime';

/**
 * Props for the Clock component
 */
interface ClockProps {
  hour: number;
  minute: number;
  second: number;
}

/**
 * Clock component displays the time with hour, minute, and second hands
 */
const Clock: React.FC<ClockProps> = ({ hour, minute, second }) => {
  useCurrentTime();
  /**
   * Calculates the rotation angle for the hour hand
   * @param hour - The hour value
   * @param minute - The minute value
   * @returns The rotation angle in degrees
   */
  const calculateHourRotation = (hour: number, minute: number): number => {
    const hourRotation = (hour % 12) * 30 + minute * 0.5;
    return hourRotation;
  };

  /**
   * Calculates the rotation angle for the minute hand
   * @param minute - The minute value
   * @param second - The second value
   * @returns The rotation angle in degrees
   */
  const calculateMinuteRotation = (minute: number, second: number): number => {
    const minuteRotation = minute * 6 + second * 0.1;
    return minuteRotation;
  };

  /**
   * Calculates the rotation angle for the second hand
   * @param second - The second value
   * @returns The rotation angle in degrees
   */
  const calculateSecondRotation = (second: number): number => {
    const secondRotation = second * 6;
    return secondRotation;
  };

  const hourRotation = calculateHourRotation(hour, minute);
  const minuteRotation = calculateMinuteRotation(minute, second);
  const secondRotation = calculateSecondRotation(second);

  return (
    <div className="clock">
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