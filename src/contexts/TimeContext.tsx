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
interface ClockContextType extends ClockState {
  /**
   * Handles the tick action and updates the time state.
   * @param {Date} date - The current date.
   * @returns {void}
   */
  handleTick(date: Date): void;
};

/**
 * Props for the ClockContextProvider component.
 */
type ClockContextProviderProps = {
  children: ReactElement
};

/*
 * The ClockContext.
 */
const ClockContext = createContext<ClockContextType | null>(null);

/**
 * The provider component for the ClockContext.
 * @param {ClockContextProviderProps} props - The component props.
 * @returns {React.ReactElement} - The ClockContextProvider component.
 */
export function ClockContextProvider({ children }: ClockContextProviderProps): React.ReactElement {
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

  /**
   * Wrap the children components with the ClockContext.Provider component.
   * Pass the time state and handleTick function as the context value.
   */ 
  return (
    <ClockContext.Provider value={{
      ...time,
      handleTick
    }}>
      {children}
    </ClockContext.Provider>
  );
}

export default ClockContext;