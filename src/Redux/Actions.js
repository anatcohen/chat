import * as firebase from 'firebase';

export const SET_SELF = 'SET_SELF';
export const ADD_USER = 'ADD_USER';
export const REMOVE_USER = 'REMOVE_USER';
export const ADD_MESSAGES = 'ADD_MESSAGES';
export const DELETE_MESSAGES = 'DELETE_MESSAGES';

function setSelf(name = '', id = '') {
    return { type: SET_SELF, name, id }
}

function addUser(user) {
    return { type: ADD_USER, user }
}

function deleteUser(name) {
    return { type: REMOVE_USER, name }
}

function addMessages(message) {
    return { type: ADD_MESSAGES, message }
}

function deleteMessages() {
    return { type: DELETE_MESSAGES }
}

// Adds user to db
export function addSelfToDataBase(name) {
    return dispatch => {
        console.log('addSelf');
        let id = String(Date.now());
        dispatch(setSelf(name, id))
        // Adds name to db and to reducer
        firebase.database().ref('users/' + id).set({ name }, () => dispatch(setSelf(name, id)));
    }
}

// Gets list of users from database
export function getUsers() {
    return (dispatch, getState) => {
        dispatch(addMessageListener());

        // Listens for added children- Users that have loggen on
        firebase.database().ref('users').on('child_added', function (data) {
            // Adds users to redux
            dispatch(addUser(data.val()));
            let name = data.val().name === getState().users.self.name ? 'YOU HAVE' : data.val().name + ' HAS';
            dispatch(addMessages({ type: 'userJoined', user: name, content: 'JOINED THE CHAT' }))
        });
        // Listens for deleted users- users thats have logged off
        firebase.database().ref('users').on('child_removed', function (data) {
            dispatch(deleteUser(data.val().name));
            dispatch(addMessages({ type: 'userLeft', user: data.val().name, content: 'HAS LEFT THE CHAT' }));
        });
    }
}

// Deletes user from db
export function deleteSelf(id) {
    return dispatch => {
        // Deletes user
        firebase.database().ref(`users/${id}`).remove();
        dispatch(setSelf());
        // Deletes messages 
        dispatch(deleteAllMessages());
    }
}

// Adds message to db
export function addMessageToDataBase(content, timeStamp, user) {
    return dispatch => {
        firebase.database().ref('chat').push().set({ type: 'message', content, timeStamp, user });
    }
}

// Gets messages from db and adds sends them to the reducer
export function addMessageListener(user) {
    return (dispatch, getState) => {
        firebase.database().ref('chat').on('child_added', function (data) {
            // Adds messages only sent after log in to redux
            if (getState().users.self.name) dispatch(addMessages(data.val()));
        })
    }
}

// Deletes all message thread from just local storage or from db too
function deleteAllMessages() {
    return (dispatch, getState) => {
        // Deletes messages from local storage
        dispatch(deleteMessages());
        firebase.database().ref('chat').off();
        // Deletes messages from database
        if (!getState().users.list.length)
            firebase.database().ref(`chat`).remove();
    }
}