import React from 'react';
import {
  createContext,
  ReactNode,
  Dispatch,
  SetStateAction,
  ReactElement
} from 'react';
import { ClockState } from '../store/reducers/clockReducer';

/**
 * The type for the TimeContext.
 */
type TimeContextType = ClockState;

/**
 * Props for the TimeContextProvider component.
 */
type TimeContextProviderProps = {
  children: ReactElement
};

/**
 * The default state for the TimeContext.
 */
const defaultState: TimeContextType = {
  hours: 0,
  minutes: 0,
  seconds: 0,
};

/*
 * The TimeContext.
 */
const TimeContext = createContext<TimeContextType>(defaultState);

/**
 * The provider component for the TimeContext.
 * @param {TimeContextProviderProps} props - The component props.
 * @returns {React.ReactElement} - The TimeContextProvider component.
 */
export function TimeContextProvider({ children }: TimeContextProviderProps): React.ReactElement {
  return (
    <TimeContext.Provider value={defaultState}>
      {children}
    </TimeContext.Provider>
  );
}

export default TimeContext;