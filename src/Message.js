import React from 'react';

export default function Message(props) {
    const isSelf = props.selfName === props.message.user;
    return (
        <div id={isSelf ? 'selfMessage' : 'userMessage'}>
            <p id='userName'>{isSelf ? 'YOU' : (props.message.user).toUpperCase()}</p>
            <div>
                <p>{props.message.timeStamp}</p>
                <h3>{props.message.content}</h3>
            </div>
        </div>
    );
}