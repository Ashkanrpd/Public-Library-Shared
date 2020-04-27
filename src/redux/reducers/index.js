import produce from 'immer';
import { combineReducers } from 'redux-immer';
import base from './GeneralReducer';
import session from './SessionReducer';

export const reducer = combineReducers(
    produce,
    { 
        base,
        session,
    }
)