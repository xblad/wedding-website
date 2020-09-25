import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface PhotoGalleryState {
    isLoading: boolean;
    photoList: Photo[];
}

export interface Photo {
    src: string;
    width: number;
    height: number;
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

interface RequestPhotosAction {
    type: 'REQUEST_PHOTOS';
}

interface ReceivePhotosAction {
    type: 'RECEIVE_PHOTOS';
    photoList: Photo[];
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = RequestPhotosAction | ReceivePhotosAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    requestPhotos: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        let state = getState();
        if (state && state.photos && !state.photos.isLoading && !state.photos.photoList.length) {
            fetch(`api/photoGallery`)
                .then(response => response.json() as Promise<Photo[]>)
                .then(data => {
                    dispatch({ type: 'RECEIVE_PHOTOS', photoList: data });
                });

            dispatch({ type: 'REQUEST_PHOTOS' });
        }
    }
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: PhotoGalleryState = { photoList: [], isLoading: false };

export const reducer: Reducer<PhotoGalleryState> = (state: PhotoGalleryState | undefined, incomingAction: Action): PhotoGalleryState => {
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'REQUEST_PHOTOS':
            return {
                ...state,
                isLoading: true
            };
        case 'RECEIVE_PHOTOS':
            return {
                ...state,
                photoList: action.photoList,
                isLoading: false
            };
    }

    return state;
};
