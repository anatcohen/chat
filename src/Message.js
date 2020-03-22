import React from 'react';

export default function Message(props) {
    return (
        <div id={props.selfName === props.message.user ? 'self-message' : 'user-message'}>
            <p>{props.message.timeStamp}</p>
            <h3>{props.message.content}</h3>
        </div>
    );
}