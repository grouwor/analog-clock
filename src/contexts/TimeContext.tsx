import React, {
  useReducer,
  createContext,
  ReactNode,
  Dispatch,
  SetStateAction,
  ReactElement
} from 'react';
import * as ClockActions from '../store/actions/clockActions';
import {
  ClockReducer,
  ClockState,
  initialState as InitialClockState
} from '../store/reducers/clockReducer';
import { ClockAction } from '../store/actions/clockActions';

/**
 * Defines the shape of the time context object.
 */
interface TimeContextType extends ClockState {
  /**
   * Handles the tick action and updates the time state.
   * @param {Date} date - The current date.
   * @returns {void}
   */
  handleTick(date: Date): void;
};

/**
 * Props for the TimeContextProvider component.
 */
type TimeContextProviderProps = {
  children: ReactElement
};

/*
 * The TimeContext.
 */
const TimeContext = createContext<TimeContextType | null>(null);

/**
 * The provider component for the TimeContext.
 * @param {TimeContextProviderProps} props - The component props.
 * @returns {React.ReactElement} - The TimeContextProvider component.
 */
export function TimeContextProvider({ children }: TimeContextProviderProps): React.ReactElement {
  // Initialize the time state using the ClockReducer and InitialClockState.
  const [time, dispatch]: [ClockState, Dispatch<ClockAction>] = useReducer(
    ClockReducer,
    InitialClockState
  );

  /**
   * Handles the tick action and updates the time state.
   * @param {Date} date - The current date.
   * @returns {void}
   */
  const handleTick = (date: Date): void => {
    // Dispatch the tick action with the current hour, minute, and second values from the date parameter.
    dispatch(ClockActions.tick(
      date.getHours(),
      date.getMinutes(),
      date.getSeconds()
    ));
  }

  // Wrap the children components with the TimeContext.Provider component, passing the time state and handleTick function as the context value.
  return (
    <TimeContext.Provider value={{
      ...time,
      handleTick
    }}>
      {children}
    </TimeContext.Provider>
  );
}

export default TimeContext;