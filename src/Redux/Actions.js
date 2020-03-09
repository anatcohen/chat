import * as firebase from 'firebase';

export const SET_SELF = 'SET_SELF'
export const SET_USERS = 'SET_USERS'
export const ADD_MESSAGES = 'ADD_MESSAGES';
export const DELETE_MESSAGES = 'DELETE_MESSAGES';

function setSelf(name = '', id = '', timeStamp = '') {
    return { type: SET_SELF, name, id, timeStamp }
}

function setUsers(list) {
    return { type: SET_USERS, list }
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
        // Adds name to db and to reducer
        firebase.database().ref('users/' + id).set({ name })
            .then(() => {
                dispatch(setSelf(name, id))
            });
    }
}

// Gets list of users from database
export function getUsers() {
    return dispatch => {
        firebase.database().ref('users').on('value', function (snapshot) {
            let arrUsers = [];
            //Checks if there are user in db
            if (snapshot.val() != null) {
                for (let [id, value] of Object.entries(snapshot.val())) {
                    arrUsers.push({ 'name': value.name, id })
                }
            }
            // Adds users to redux
            dispatch(setUsers(arrUsers));
            // Creates listener for messages
            dispatch(getAllMessages());
        });
    }
}

// Deletes user from db
export function deleteSelf(id) {
    return dispatch => {
        // Deletes user
        firebase.database().ref(`users/${id}`).remove()
            .then(() => dispatch(setSelf()));
        // Deletes messages 
        dispatch(deleteMessages())
    }
}

// Adds message to db
export function addMessageToDataBase(content, user) {
    return dispatch => {
        firebase.database().ref('chat').push().set({ content, user });
    }
}

// Gets messages from db and adds sends them to theb reducer
function getAllMessages(user) {
    return (dispatch, getState) => {
        firebase.database().ref('chat').on('child_added', function (data) {
            // Adds messages sent after log in to redux
            if (getState().users.self.name) dispatch(addMessages(data.val()));
        })
    }
}