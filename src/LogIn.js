import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function LogIn(props) {
    // Displays enter button and name error if needed
    const onTextChange = e => {
        let name = e.currentTarget.value, bIsNameUnique = !props.users.users.filter(user => user.name === name).length;
        // Checks whether or not to to display enter button- If text is empty&name is unique
        document.getElementById('enter').style.visibility = (name.length && bIsNameUnique) ? 'visible' : 'hidden';
        // Checks whether or not to display name error- If name is already taken
        document.getElementById('nameAlert').style.visibility = !bIsNameUnique ? 'visible' : 'hidden';
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
                <p id='nameAlert' style={{ visibility: 'hidden' }}>Username is already taken</p>
                <Link to='/ChatRoom'><button id='enter' onClick={() => props.addSelfToDataBase(document.getElementById('name').value)} style={{ visibility: 'hidden' }}>Enter</button></Link>
            </form>
        </>
    );
}



