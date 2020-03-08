import * as firebase from 'firebase';

export const SET_SELF = 'SET_SELF'
export const SET_USERS = 'SET_USERS'

function setSelf(name = '', id = '') {
    return { type: SET_SELF, name, id }
}

function setUsers(list) {
    return { type: SET_USERS, list }
}

export function addSelfToDataBase(name) {
    return dispatch => {
        let id = String(Date.now());
        console.log(`id: ${id} name: ${name}`)
        // Adds name to db and to reducer
        firebase.database().ref('users/' + id).set({ name })
            .then(() => dispatch(setSelf(name, id)));
    }
}

// Gets list of users from database
export function getUsers() {
    return dispatch => {
        firebase.database().ref('users').on('value', function (snapshot) {
            let arrUsers = [];
            //If there are user in db
            if (snapshot.val() != null) {
                for (let [id, value] of Object.entries(snapshot.val())) {
                    arrUsers.push({ 'name': value.name, id })
                }
            }
            // Adds users to redux
            dispatch(setUsers(arrUsers));
        });
    }
}

export function deleteSelf(id) {
    return dispatch => {
        firebase.database().ref(`users/${id}`).remove()
            .then(() => dispatch(setSelf()));
    }
}