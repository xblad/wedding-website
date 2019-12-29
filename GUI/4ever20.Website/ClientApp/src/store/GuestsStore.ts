import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface GuestsState {
    isLoading: boolean;
    guestList: Guest[];
    currentGuest?: Guest;
}

export interface Guest {
    id: number;
    firstName: string;
    lastName: string;
    fullName: string;
    about: string;
    img: string;
    invitationGuid?: string;
    invitationSentDateTime?: Date;
    invitationSeenDateTime?: Date;
    isGoing?: boolean;
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

interface RequestGuestsAction {
    type: 'REQUEST_GUESTS';
}

interface ReceiveGuestsAction {
    type: 'RECEIVE_GUESTS';
    guestList: Guest[];
}

interface SetCurrentGuestAction {
    type: 'SET_CURRENT_GUEST';
    currentGuestFilter: (g: Guest) => boolean;
}

interface IndicateAttendanceAction {
    type: 'INDICATE_ATTENDANCE';
    isGoing: boolean;
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = RequestGuestsAction | ReceiveGuestsAction | SetCurrentGuestAction | IndicateAttendanceAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    requestGuests: (currentGuestFilter: (g: Guest) => boolean): AppThunkAction<KnownAction> => (dispatch, getState) => {
        let state = getState();
        if (state && state.guests && !state.guests.guestList.length) {
            fetch(`guest`)
                .then(response => response.json() as Promise<Guest[]>)
                .then(data => {
                    dispatch({ type: 'RECEIVE_GUESTS', guestList: data });
                    dispatch({ type: 'SET_CURRENT_GUEST', currentGuestFilter: currentGuestFilter })
                });

            dispatch({ type: 'REQUEST_GUESTS' });
        }
    },
    setCurrentGuest: (currentGuestFilter: (g: Guest) => boolean): AppThunkAction<KnownAction> => (dispatch, getState) => {
        let state = getState();
        if (state && state.guests && !state.guests.currentGuest && state.guests.guestList.length) {
            dispatch({ type: 'SET_CURRENT_GUEST', currentGuestFilter: currentGuestFilter });
        }
    },
    indicateAttendance: (isGoing: boolean): AppThunkAction<KnownAction> => (dispatch, getState) => {
        let state = getState();
        if (state && state.guests && state.guests.currentGuest && typeof state.guests.currentGuest.isGoing !== "boolean") {
            fetch(`invitation/${state.guests.currentGuest.invitationGuid}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: isGoing.toString()
            })
                .then(r => {
                    if (r.ok)
                        dispatch({ type: 'INDICATE_ATTENDANCE', isGoing: isGoing });
                });
        }
    }
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: GuestsState = { guestList: [], isLoading: false };

export const reducer: Reducer<GuestsState> = (state: GuestsState | undefined, incomingAction: Action): GuestsState => {
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'REQUEST_GUESTS':
            return {
                ...state,
                isLoading: true
            };
        case 'RECEIVE_GUESTS':
            return {
                ...state,
                guestList: action.guestList,
                isLoading: false
            };
        case 'SET_CURRENT_GUEST':
            return {
                ...state,
                currentGuest: state.guestList.find(action.currentGuestFilter),
                isLoading: false
            }
        case 'INDICATE_ATTENDANCE':
            if (!state.currentGuest)
                return { guestList: state.guestList, isLoading: false };

            if (typeof state.currentGuest.isGoing === "boolean") {
                return state;
            }

            return {
                ...state,
                currentGuest: { ...state.currentGuest, isGoing: action.isGoing }
            }
    }

    return state;
};
