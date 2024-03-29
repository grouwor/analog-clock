import ClockActionTypes from "../actions/clockActionTypes";
import { ClockAction } from "../actions/clockActions";


/**
 * Interface for the clock state.
 */
export interface ClockState {
  hours: number,
  minutes: number,
  seconds: number,
}

/**
 * Initial state for the clock reducer.
 */
export const initialState: ClockState = {
  hours: 0,
  minutes: 0,
  seconds: 0,
};

export const ClockReducer = (state: ClockState = initialState, action: ClockAction): ClockState => {
  switch (action.type) {
    case ClockActionTypes.TICK:
      return {
        ...state,
        ...action.payload
      };
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
};
