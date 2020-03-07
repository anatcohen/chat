import * as actions from './Actions';
import { combineReducers } from 'redux';

//const INITIAL_SELF_STATE = { name: '', id: '' };
const INITIAL_USERS_STATE = { self: { name: '', id: '' }, users: [] }

function usersReducer(state = INITIAL_USERS_STATE, action) {
    switch (action.type) {
        case actions.SET_SELF:
            return { ...state, self: { name: action.name, id: action.id } }
        case actions.SET_USERS:
            return { ...state, users: action.list };
        default:
            return state;
    }
}

export default combineReducers({
    users: usersReducer
});