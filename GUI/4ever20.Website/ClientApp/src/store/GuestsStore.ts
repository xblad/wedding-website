import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface GuestsState {
    isLoading: boolean;
    guestList: Guest[];
}

export interface Guest {
    id: number;
    firstName: string;
    lastName: string;
    fullName: string;
    summary: string;
    img: string;
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

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = RequestGuestsAction | ReceiveGuestsAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    requestGuests: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        let state = getState();
        if (state && state.guests && !state.guests.guestList.length) {
            fetch(`guest`)
                .then(response => response.json() as Promise<Guest[]>)
                .then(data => {
                    dispatch({ type: 'RECEIVE_GUESTS', guestList: data });
                });

            dispatch({ type: 'REQUEST_GUESTS' });
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
                guestList: state.guestList,
                isLoading: true
            };
        case 'RECEIVE_GUESTS':
            return {
                guestList: action.guestList,
                isLoading: false
            };
    }

    return state;
};
