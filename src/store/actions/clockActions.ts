import ClockActionTypes from "./clockActionTypes";

/**
 * Interface for the clock action.
 */
export interface ClockAction {
  type: string;
  payload: {
    hours: number;
    minutes: number;
    seconds: number;
  };
}

/**
 * Action creator for the tick action.
 * @param {number} hours - The current hours value.
 * @param {number} minutes - The current minutes value.
 * @param {number} seconds - The current seconds value.
 * @returns {ClockAction} - The tick action object.
 */
export const tick = (
  hours: number,
  minutes: number,
  seconds: number
): ClockAction => ({
  type: ClockActionTypes.TICK,
  payload: {
    hours,
    minutes,
    seconds,
  },
});