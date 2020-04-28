import produce from 'immer';
import { combineReducers } from 'redux-immer';
import { generalReducer } from './GeneralReducer';
import { sessionReducer } from './SessionReducer';

// The name we give a reducer here, will be the name that it's state is available under in the application
export const reducer = combineReducers(
    produce,
    { 
        base: generalReducer,
        session: sessionReducer,
    }
)