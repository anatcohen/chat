import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function LogIn(props) {
    const [isUnique, setUnique] = useState(false),
        // Displays enter button and name error if needed
        onTextChange = e => {
            let name = e.currentTarget.value, bIsUnique = !props.users.list.filter(user => user.name === name).length;
            setUnique(bIsUnique && name.length !== 0);
            document.getElementById('nameAlert').style.visibility = (!bIsUnique && name.length) ? 'visible' : 'hidden';
        },
        // On enter button click
        onEnterClick = () => {
            props.addSelfToDataBase(document.getElementById('name').value);
        };

    useEffect(() => {
        document.getElementById('name').focus();
        props.getUsers();
    }, []);

    return (
        <div id='logIn'>
            <div id='leftPanel'>
                <h1>Chat Room</h1>
                <p>{props.users.list.length} USERS ONLINE</p>
            </div>
            <div id='rightPanel'>
                <form autoComplete='off'>
                    <h2>Enter Chat Room:</h2>
                    <div className='textbox-logo'>
                        <input onChange={onTextChange} type='text' id='name' placeholder='Enter nickname' />
                        {isUnique && <Link to='/messenger/room'> <button id='enterBtn' onClick={onEnterClick} /></Link>}
                    </div>
                    <p id='nameAlert' style={{ visibility: 'hidden' }}>USERNAME HAS ALREADY BEEN TAKEN</p>
                </form>
            </div>
        </div>
    );
}



