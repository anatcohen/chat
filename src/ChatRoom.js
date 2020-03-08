import React from 'react';
import { Link } from 'react-router-dom';

export default function ChatRoom(props) {

    return (
        <>
            <p>{props.users.users.map(value => { return `${value.name}, ` })} are in the chat</p>
            <Link to='/'><button >Exit</button></Link>

            <form>
                <input type='textbox' placeholder='Enter message' />
                <button>Send</button>
            </form>
        </>
    );
}