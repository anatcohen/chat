import React from 'react';

export default function Message(props) {
    return (
        <div id={props.userName === 'YOU' ? 'selfMessage' : 'userMessage'}>
            <p id='userName'>{props.userName}</p>
            <div>
                <p>{props.message.timeStamp}</p>
                <h3>{props.message.content}</h3>
            </div>
        </div>
    );
}