import * as firebase from 'firebase';

/*
export const SET_DATA = 'SET_DATA'

function setData(data) {
    return { type: SET_DATA, data }
}
export function setDisplay(data) {
    return { type: SET_DISPLAY, data }
}

// Gets files from database
export function getFromDataBase() {
    return dispatch => {
        let arrData = [];
        firebase.firestore().collection("portfolio").get().then(querySnapshot => {
            // Adds each retrieved file to an array
            querySnapshot.forEach(function (doc) {
                arrData.push(doc.data());
            });
            // Dispatches files to relevent reducers
            dispatch(setData(arrData));
            dispatch(setDisplay(arrData));
            dispatch(getTypes(arrData));
            dispatch(changeDataRetrieved(true));
        });
    }
}
*/