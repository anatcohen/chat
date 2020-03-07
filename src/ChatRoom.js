import React from 'react';
import { Link } from 'react-router-dom';

export default function ChatRoom(props) {

    const onExitClick = e => {
        console.log(props.users.self.id);
        props.deleteSelf(props.users.self.id);
    }

    return (
        <>
            <p>{props.users.users.map(value => { return `${value.name}, ` })} are in the chat</p>
            <Link to='/'><button onClick={onExitClick}>Exit</button></Link>
        </>
    );
}