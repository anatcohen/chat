import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from "react-router-dom";
import * as firebase from 'firebase';
import { Provider } from 'react-redux';
import store from './redux/store';

const config = {
    apiKey: "AIzaSyDlr7lzC7eunsm6NtcTV2bfXLhfM618fz0",
    authDomain: "chatroom-2eb3f.firebaseapp.com",
    databaseURL: "https://chatroom-2eb3f.firebaseio.com",
    projectId: "chatroom-2eb3f",
    storageBucket: "chatroom-2eb3f.appspot.com",
    messagingSenderId: "398638027058",
    appId: "1:398638027058:web:d52c3e41f6f8a75421472b",
    measurementId: "G-HEE2T4312L"
};

firebase.initializeApp(config);

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
