import ClockActionTypes from "../actions/clockActionTypes";
import { ClockAction } from "../actions/clockActions";


/**
 * Interface for the clock state.
 */
export interface ClockState {
    hours: 0,
    minutes: 0,
    seconds: 0,
}

/**
 * Initial state for the clock reducer.
 */
export const initialState: ClockState = {
    hours: 0,
    minutes: 0,
    seconds: 0,
};

export default function Clock(state: ClockState = initialState, action: ClockAction) {
    switch (action.type) {
        case ClockActionTypes.TICK:
            return {
                ...state,
                ...action.payload
            };
    }
};
