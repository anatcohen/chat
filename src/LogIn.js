import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function LogIn(props) {
    // Displays enter button once texbox isn't empty
    const onTextChange = e => {
        document.getElementById('enter').style.visibility = e.currentTarget.value.length ? 'visible' : 'hidden';
    },
        onSubmit = e => {
            let name = document.getElementById('name').value;
            // firebase.firestore().collection('users').doc(id).set({ name });
            props.addSelfToDataBase(name);
        };

    useEffect(() => {
        props.getUsers();
    }, []);

    return (
        <>
            <form autoComplete='off'>
                <p>There are currently {props.users.users.length} users logged on</p>
                <h1>Enter ChatRoom</h1>
                <input onChange={onTextChange} type='text' id='name' placeholder='Enter nickname' />
                <Link to='/ChatRoom'><button id='enter' onClick={onSubmit} style={{ visibility: 'hidden' }}>Enter</button></Link>
            </form>
        </>
    );
}



