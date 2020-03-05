import React from 'react';
import { Link } from 'react-router-dom';

export default function LogIn(props) {
    return (
        <>
            <form>
                <h1>Enter ChatRoom</h1>
                <p>There are currently - users in the chat room</p>
                <input type='text' placeholder='Enter nickname' />
                <Link to='/ChatRoom'><button>Enter</button></Link>
            </form>
        </>
    );
}



