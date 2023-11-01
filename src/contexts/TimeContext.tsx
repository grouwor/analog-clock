import React from 'react';
import {
    createContext,
    ReactNode,
    Dispatch,
    SetStateAction,
    ReactElement
} from 'react';

type TimeContextType = {
    /**
     * Hours of the current time.
     */
    hours: number;
    /**
     * Minutes of the current time.
     */
    minutes: number;
    /**
     * Seconds of the current time.
     */
    seconds: number;
};

type TimeContextProviderProps = {
    children: ReactElement
};
/**
 * The context for the current time.
 */
const defaultState = {
    hours: 0,
    minutes: 0,
    seconds: 0,
};

const TimeContext = createContext<TimeContextType>(defaultState);

/**
 * The provider component for the TimeContext.
 * @param children - The children components.
 */
export function TimeContextProvider({ children }: TimeContextProviderProps) {
    return (
        <TimeContext.Provider value={defaultState}>
            {children}
        </TimeContext.Provider>
    );
}

export default TimeContext;