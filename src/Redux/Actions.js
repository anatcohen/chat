import * as firebase from 'firebase';

export const SET_SELF = 'SET_SELF';
export const SET_USERS = 'SET_USERS';
export const REMOVE_USER = 'REMOVE_USER';
export const ADD_MESSAGES = 'ADD_MESSAGES';
export const DELETE_MESSAGES = 'DELETE_MESSAGES';

function setSelf(name = '', id = '') {
    return { type: SET_SELF, name, id }
}

function setUsers(list) {
    return { type: SET_USERS, list }
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
        let id = String(Date.now());
        dispatch(setSelf(name, id))
        // Adds name to db and to reducer
        firebase.database().ref(`users/${id}`).set({ name }, () => dispatch(setSelf(name, id)));
        // When connection to db disconnects
        firebase.database().ref(`users/${id}`).onDisconnect().remove();

    }
}

// Gets list of users from database
export function getUsers() {
    return (dispatch, getState) => {
        // Creates message listener
        dispatch(addMessageListener());
        // Creates user listener
        firebase.database().ref('users').on('value', function (snapshot) {
            let arrUsers = [];

            if (snapshot.val() != null) {
                for (let [id, value] of Object.entries(snapshot.val())) {
                    arrUsers.push({ 'name': value.name, id })
                }
            }

            // Creates 'new user joined' message 
            if (getState().users.self.name !== '' && arrUsers.length) {
                let lastUser = arrUsers[arrUsers.length - 1].name;
                // Checks if last user in db list is actually a new user 
                if (getState().users.list.findIndex(user => user.name === lastUser) === -1) {
                    let user = (lastUser === getState().users.self.name) ? 'YOU HAVE' : lastUser + ' HAS';
                    dispatch(addMessages({ type: 'userJoined', user, content: 'JOINED THE CHAT' }))
                }
            }
            // Adds users to redux
            dispatch(setUsers(arrUsers));
        });

        // Creates listener for deleted users- users thats have logged off
        firebase.database().ref('users').on('child_removed', function (data) {
            // Disconnection
            if (data.val().name === getState().users.self.name) {
                dispatch(addMessages({ type: 'userLeft', user: '', content: 'YOU HAVE DISCONNECTED FROM THE CHAT' }));
                // Directs web back to log in page
                setTimeout(() => {
                    firebase.database().ref('users').off();
                    dispatch(deleteAllMessages());
                    // window.location.href = 'http://localhost:3000/ChatRoom/';
                    window.location.href = 'https://anatcohen.github.io/ChatRoom/';
                }, 2500);
            }
            // Different user logged off
            else
                dispatch(addMessages({ type: 'userLeft', user: data.val().name, content: 'HAS LEFT THE CHAT' }));
        });
    }
}

// Deletes user from db
export function deleteSelf(id) {
    return dispatch => {
        // Deletes user and removes listeners
        firebase.database().ref(`users/${id}`).remove();
        firebase.database().ref('users').off();
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

// Deletes message thread from just local storage or from db too
function deleteAllMessages() {
    return (dispatch, getState) => {
        // Deletes messages from local storageand removes listener
        dispatch(deleteMessages());
        firebase.database().ref('chat').off();
        // Deletes messages from database
        if (!getState().users.list.length)
            firebase.database().ref(`chat`).remove();
    }
}