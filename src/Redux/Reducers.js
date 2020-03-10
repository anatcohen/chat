import * as actions from './Actions';
import { combineReducers } from 'redux';

//const INITIAL_SELF_STATE = { name: '', id: '' };
const INITIAL_USERS_STATE = { self: { name: '', id: '' }, users: [] }
const INITIAL_MESSAGES_STATE = { list: [] }

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

function messagesReducer(state = INITIAL_MESSAGES_STATE, action) {
    switch (action.type) {
        case actions.ADD_MESSAGES:
            return { list: [...state.list, action.message] }
        case actions.DELETE_MESSAGES:
            return INITIAL_MESSAGES_STATE;
        default:
            return state;
    }
}

export default combineReducers({
    users: usersReducer,
    messages: messagesReducer
});