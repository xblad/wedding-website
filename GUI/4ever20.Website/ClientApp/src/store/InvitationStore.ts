import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';
import history from '../history';

const invitationRegex = /^[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{12}$/;
// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface InvitationState {
    isLoading: boolean;
    invitationObject?: Invitation;
    lastError?: string;
}

export interface Invitation {
    invitationGuid?: string;
    firstName: string;
    lastName: string;
    invitationSeen: boolean;
    isGoing?: boolean;
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

interface LoadingAction {
    type: 'LOADING';
}

interface FailedAction {
    type: 'FAILED';
    error?: string;
}

interface ReceiveInvitationAction {
    type: 'RECEIVE_INVITATION';
    invitation: Invitation;
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = LoadingAction | FailedAction | ReceiveInvitationAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    requestInvitation: (invitationGuid: string): AppThunkAction<KnownAction> => (dispatch, getState) => {
        if (!invitationRegex.test(invitationGuid)) return;
        let state = getState();
        if (state && state.invitation && !state.invitation.invitationObject) {
            fetch(`api/invitation/${invitationGuid}`)
                .then(response => {
                    if (!response.ok) { throw Error(response.statusText) }
                    return response.json() as Promise<Invitation>
                })
                .then(invitationData => {
                    history.replace(`/save-the-date/${invitationGuid}`);
                    dispatch({ type: 'RECEIVE_INVITATION', invitation: invitationData });
                })
                .catch(() => {
                    history.replace(`/save-the-date/`);
                    dispatch({ type: 'FAILED', error: `Invitation ID '${invitationGuid}' doesn't exist.` })
                });

            dispatch({ type: 'LOADING' });
        }
    },
    indicateAttendance: (isGoing: boolean): AppThunkAction<KnownAction> => (dispatch, getState) => {
        let state = getState();
        if (state && state.invitation
            && state.invitation.invitationObject
            && typeof state.invitation.invitationObject.isGoing !== "boolean") {

            let invitation = state.invitation.invitationObject;
            let invitationGuid = invitation.invitationGuid || "";
            fetch(`api/invitation/attendance/${invitationGuid}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: isGoing.toString()
            })
                .then(r => {
                    if (!r.ok) { throw Error(r.statusText) }
                    dispatch({ type: 'RECEIVE_INVITATION', invitation: { ...invitation, isGoing: isGoing } });
                })
                .catch(() => {
                    dispatch({ type: 'FAILED', error: 'Failed to capture your response. Please try again.' })
                });

            dispatch({ type: 'LOADING' });
        }
    }
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: InvitationState = { isLoading: false };

export const reducer: Reducer<InvitationState> = (state: InvitationState | undefined, incomingAction: Action): InvitationState => {
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'LOADING':
            return {
                ...state,
                isLoading: true
            };
        case 'FAILED':
            return {
                ...state,
                lastError: action.error,
                isLoading: false
            };
        case 'RECEIVE_INVITATION':
            return {
                ...state,
                invitationObject: action.invitation,
                isLoading: false
            };
    }

    return state;
};